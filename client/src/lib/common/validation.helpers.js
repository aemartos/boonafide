import { gsap } from 'gsap';
import { Draggable } from 'gsap/Draggable';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';

// Register the plugins
gsap.registerPlugin(Draggable, DrawSVGPlugin);

const DEG = 180 / Math.PI;

function distance2(p, point) {
  const dx = p.x - point.x;
  const dy = p.y - point.y;
  return dx * dx + dy * dy;
}

function distance2sqrt(p) {
  const dx = p.x - 0;
  const dy = p.y - 0;
  return Math.sqrt(dx * dx + dy * dy);
}

function getRotation(p1, p2) {
  const dx = p2.x - p1.x;
  const dy = p2.y - p1.y;
  return Math.atan2(dy, dx);
}

function closestPoint(pathNode, pathLengthh, point, lastPoint, lastLength) {
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

  scanTo = scanTo > pathLengthh ? pathLengthh : scanTo;

  for (
    // eslint-disable-next-line
    var scan, scanLength = scanFrom, scanDistance; scanLength <= scanTo; scanLength += precision
  ) {
    scanDistance = distance2(
      (scan = pathNode.getPointAtLength(scanLength)),
      point,
    );
    if (scanDistance < bestDistance) {
      best = scan;
      bestLength = scanLength;
      bestDistance = scanDistance;
    }
  }

  const len2 = bestLength + (bestLength === pathLengthh ? -0.1 : 0.1);
  const rotation = getRotation(best, pathNode.getPointAtLength(len2));

  return {
    point: best,
    rotation: rotation * DEG,
    length: bestLength,
  };
}

export function validateStart(callback, isAlreadyValidated = false) {
  const path = document.querySelector('#path');
  const drawPath = document.querySelector('#drawMe');
  const drag = document.querySelector('#drag');

  if (!path || !drawPath || !drag) {
    console.error('Required SVG elements not found');
    return;
  }

  const pathLength = path.getTotalLength();
  const startPoint = path.getPointAtLength(0);

  // Position the drag circle at the start of the path
  gsap.set(drag, {
    x: startPoint.x,
    y: startPoint.y,
    transformOrigin: 'center',
  });

  // If ticket is already validated, show the filled path and disable interaction
  if (isAlreadyValidated) {
    gsap.set(drawPath, {
      drawSVG: '0% 100%',
    });
    gsap.set(drag, {
      opacity: 0.3,
      pointerEvents: 'none',
    });
    return;
  }

  // Initialize the drawing animation - start with 0% drawn
  gsap.set(drawPath, {
    drawSVG: '0% 0%',
  });

  const lastPoint = { x: startPoint.x, y: startPoint.y };
  let lastLength = 0;
  let isDrawing = false;

  const pointModifier = (point) => {
    const p = closestPoint(path, pathLength, point, lastPoint, lastLength);

    // Only allow progress forward along the path
    // Use a small tolerance to prevent getting stuck
    if (p.length < lastLength - 5) {
      // If trying to go backwards significantly, snap back to the last valid position
      gsap.set(drag, {
        x: lastPoint.x,
        y: lastPoint.y,
        rotation: getRotation(lastPoint, path.getPointAtLength(lastLength + 0.1)) * DEG,
      });
      return lastPoint;
    }

    // Update the drag circle position
    gsap.set(drag, {
      x: p.point.x,
      y: p.point.y,
      rotation: p.rotation,
    });

    // Update progress tracking
    lastPoint.x = p.point.x;
    lastPoint.y = p.point.y;
    lastLength = p.length;

    // Start drawing immediately when movement begins
    if (!isDrawing) {
      isDrawing = true;
    }

    // Update the drawing progress - fill the path as we move
    const prog = lastLength / pathLength;
    gsap.to(drawPath, {
      drawSVG: `0% ${prog * 100}%`,
      duration: 0.1,
      ease: 'none',
    });

    // Check if validation is complete
    if (prog > 0.994 && callback) {
      callback();
      // eslint-disable-next-line no-param-reassign
      callback = null;
    }

    return p.point;
  };

  // Create the draggable functionality
  const draggable = new Draggable(drag, {
    liveSnap: {
      points: pointModifier,
    },
    onDrag() {
      // Additional drag handling if needed
    },
  });

  // Store the draggable instance for cleanup
  window.currentDraggable = draggable;

  // Make the container visible
  gsap.set(drawPath.parentElement, {
    autoAlpha: 1,
  });
}

export function validateStop() {
  // Clean up any existing validation elements if they exist
  const existingElements = document.querySelectorAll('#tmax, #dragg, #draw');
  existingElements.forEach((el) => el.remove());

  // Clean up the draggable instance
  if (window.currentDraggable) {
    window.currentDraggable.kill();
    window.currentDraggable = null;
  }
}
