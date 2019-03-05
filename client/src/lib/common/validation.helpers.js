import { getScript } from './helpers';

export function validateStart(callback) {
  getScript('/vendor/TweenMax.min.js', 'tmax', () => {
    getScript('/vendor/Draggable.min.js', 'dragg', () => {
      getScript('/vendor/DrawSVGPlugin.min.js', 'draw', () => {
        const {
          TweenMax, Draggable, Linear, TweenLite,
        } = window;

        const DEG = 180 / Math.PI;

        const drag = document.querySelector('#drag');
        const path = document.querySelector('#path');

        const pathLength = path.getTotalLength() || 0;
        const startPoint = path.getPointAtLength(0);
        const startAngle = getRotation(startPoint, path.getPointAtLength(0.1));
        const lastPoint = path.getPointAtLength(0);
        let lastLength = 0;

        const drawTween = TweenMax.from('#drawMe', 1, {
          drawSVG: '0%',
          stroke: '#ead155',
          paused: true,
          ease: Linear.easeNone,
        });

        TweenLite.set(drag, {
          transformOrigin: 'center',
          rotation: `${startAngle}_rad`,
          // xPercent: -50,
          // yPercent: -50,
          x: startPoint.x,
          y: startPoint.y,
        });

        const pointModifier = (point) => {
          const p = closestPoint(path, pathLength, point);

          TweenLite.set(drag, {
            rotation: p.rotation,
          });

          lastPoint.x = point.x;
          lastPoint.y = point.y;
          lastLength = p.length;
          const prog = lastLength / pathLength;
          drawTween.progress(prog);
          if (prog > 0.994 && callback) {
            callback();
            callback = null;
          }
          return p.point;
        };

        new Draggable(drag, {
          liveSnap: {
            points: pointModifier,
          },
        });

        TweenLite.set('.container', {
          autoAlpha: 1,
        });

        function closestPoint(pathNode, pathLength, point) {
          const precision = 1;
          let best;
          let bestLength;
          let bestDistance = Infinity;
          const traveled = distance2sqrt(lastPoint);
          let scanFrom = lastLength - traveled;
          let scanTo = lastLength + traveled;
          scanFrom = scanFrom < 0 ? 0 : scanFrom;

          if (traveled * 2 < 20) {
            scanTo = scanFrom + 20;
          }

          scanTo = scanTo > pathLength ? pathLength : scanTo;

          for (
            // eslint-disable-next-line
            var scan, scanLength = scanFrom, scanDistance; scanLength <= scanTo; scanLength += precision
          ) {
            if (
              (scanDistance = distance2(
                (scan = pathNode.getPointAtLength(scanLength)),
              )) < bestDistance
            ) {
              best = scan;
              bestLength = scanLength;
              bestDistance = scanDistance;
            }
          }

          const len2 = bestLength + (bestLength === pathLength ? -0.1 : 0.1);
          const rotation = getRotation(best, pathNode.getPointAtLength(len2));

          return {
            point: best,
            rotation: rotation * DEG,
            length: bestLength,
          };

          function distance2(p) {
            const dx = p.x - point.x;
            const dy = p.y - point.y;
            return dx * dx + dy * dy;
          }

          function distance2sqrt(p) {
            const dx = p.x - point.x;
            const dy = p.y - point.y;
            return Math.sqrt(dx * dx + dy * dy);
          }
        }

        function getRotation(p1, p2) {
          const dx = p2.x - p1.x;
          const dy = p2.y - p1.y;
          return Math.atan2(dy, dx);
        }
      });
    });
  });
}

export function validateStop() {
  document.getElementById('tmax').remove();
  document.getElementById('dragg').remove();
  document.getElementById('draw').remove();
}
