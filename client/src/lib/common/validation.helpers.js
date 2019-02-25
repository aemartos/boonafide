import { getScript } from "./helpers";

export function validateStart(callback) {
  getScript("/vendor/TweenMax.min.js", "tmax", () => {
    getScript("/vendor/Draggable.min.js", "dragg", () => {
      getScript("/vendor/DrawSVGPlugin.min.js", "draw", () => {
        var {TweenMax, Draggable, Linear, TweenLite} = window;

        var DEG = 180 / Math.PI;

        var drag = document.querySelector("#drag");
        var path = document.querySelector("#path");

        var pathLength = path.getTotalLength() || 0;
        var startPoint = path.getPointAtLength(0);
        var startAngle = getRotation(startPoint, path.getPointAtLength(0.1));
        var lastPoint = path.getPointAtLength(0);
        var lastLength = 0;

        var drawTween = TweenMax.from("#drawMe", 1, {
          drawSVG: "0%",
          stroke: '#ead155',
          paused: true,
          ease: Linear.easeNone
        });

        TweenLite.set(drag, {
          transformOrigin: "center",
          rotation: startAngle + "_rad",
          // xPercent: -50,
          // yPercent: -50,
          x: startPoint.x,
          y: startPoint.y
        });

        const pointModifier = (point) => {
          var p = closestPoint(path, pathLength, point);

          TweenLite.set(drag, {
            rotation: p.rotation
          });

          lastPoint.x = point.x;
          lastPoint.y = point.y;
          lastLength = p.length;
          let prog = lastLength / pathLength;
          drawTween.progress(prog);
          if (prog > 0.994) callback();
          return p.point;
        }

        new Draggable(drag, {
          liveSnap: {
            points: pointModifier
          }
        });

        TweenLite.set(".container", {
          autoAlpha: 1
        });

        function closestPoint(pathNode, pathLength, point) {
          var precision = 1,
            best,
            bestLength,
            bestDistance = Infinity;
          var traveled = distance2sqrt(lastPoint);
          var scanFrom = lastLength - traveled;
          var scanTo = lastLength + traveled;
          scanFrom = scanFrom < 0 ? 0 : scanFrom;

          if (traveled * 2 < 20) {
            scanTo = scanFrom + 20;
          }

          scanTo = scanTo > pathLength ? pathLength : scanTo;

          for (
            var scan, scanLength = scanFrom, scanDistance; scanLength <= scanTo; scanLength += precision
          ) {
            if (
              (scanDistance = distance2(
                (scan = pathNode.getPointAtLength(scanLength))
              )) < bestDistance
            ) {
              best = scan;
              bestLength = scanLength;
              bestDistance = scanDistance;
            }
          }

          var len2 = bestLength + (bestLength === pathLength ? -0.1 : 0.1);
          var rotation = getRotation(best, pathNode.getPointAtLength(len2));

          return {
            point: best,
            rotation: rotation * DEG,
            length: bestLength
          };

          function distance2(p) {
            var dx = p.x - point.x,
              dy = p.y - point.y;
            return dx * dx + dy * dy;
          }

          function distance2sqrt(p) {
            var dx = p.x - point.x,
              dy = p.y - point.y;
            return Math.sqrt(dx * dx + dy * dy);
          }
        }

        function getRotation(p1, p2) {
          var dx = p2.x - p1.x;
          var dy = p2.y - p1.y;
          return Math.atan2(dy, dx);
        }
      });
    });
  });
}

export function validateStop() {
  document.getElementById("tmax").remove();
  document.getElementById("dragg").remove();
  document.getElementById("draw").remove();
}
