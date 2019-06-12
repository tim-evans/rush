import { Edge, Orientation } from '../builder';
import Constraint from '../constraint';
import Rectangle from '../rectangle';

function slideHorizontally(
  guidelines: Array<'leftEdge' | 'center' | 'rightEdge'>,
  boundary: Rectangle,
  target: Rectangle,
  popover: Rectangle,
  pointer: Rectangle
) {
  let edges = {
    leftEdge:  Math.min(target.width / 2 - (pointer.width * 1.5), 0),
    center:    (target.width / 2 - popover.width / 2),
    rightEdge: target.width - popover.width
  };

  let range = guidelines.map(guideline => edges[guideline])
                        .sort((a, b) => a - b);

  let left = target.x + range[0];
  let right = left + popover.width;

  let minX = target.x + range[0];
  let maxX = target.x + range[1];

  let padding = pointer.width;

  // Adjust the popover so it remains in view
  if (left < boundary.left + padding) {
    left = boundary.left + padding;
  } else if (right > boundary.right - padding) {
    left = boundary.right - popover.width - padding;
  }

  let valid = left >= minX && left <= maxX;
  left = Math.max(Math.min(left, maxX), minX);

  popover.x = left;

  let dX = target.left - left;
  let oneThird = (edges.leftEdge - edges.rightEdge) / 3;
  let edge;

  if (dX < oneThird) {
    pointer.x = dX + Math.min(pointer.width, target.width / 2 - pointer.width * 1.5);
    edge = 'leftEdge';
  } else if (dX < oneThird * 2) {
    pointer.x = dX + target.width / 2 - pointer.width / 2;
    edge = 'center';
  } else {
    pointer.x = dX + target.width - pointer.width * 1.5;
    edge = 'rightEdge';
  }

  return {
    valid,
    edge: edge as Edge
  };
}

function slideVertically(
  guidelines: Array<'topEdge' | 'center' | 'bottomEdge'>,
  boundary: Rectangle,
  target: Rectangle,
  popover: Rectangle,
  pointer: Rectangle
) {
  let edges = {
    topEdge:    Math.min(target.height / 2 - (pointer.height * 1.5), 0),
    center:     (target.height / 2 - popover.height / 2),
    bottomEdge: target.height - popover.height
  };
  let range = guidelines.map(guideline => edges[guideline])
                        .sort((a, b) => a - b);

  let top = target.y + range[0];
  let bottom = top + popover.height;

  let minY = target.y + range[0];
  let maxY = target.y + range[1];

  let padding = pointer.height;

  // Adjust the popover so it remains in view
  if (top < boundary.top + padding) {
    top = boundary.top + padding;
  } else if (bottom > boundary.bottom - padding) {
    top = boundary.bottom - popover.height - padding;
  }

  let valid = top >= minY && top <= maxY;
  top = Math.max(Math.min(top, maxY), minY + padding);

  popover.y = top;

  let dY = target.top - top;
  let oneThird = (edges.topEdge - edges.bottomEdge) / 3;
  let edge;

  if (dY < oneThird) {
    pointer.y = dY + pointer.height + Math.min(target.height / 2 - (pointer.height * 1.5), 0);
    edge = 'topEdge';
  } else if (dY < oneThird * 2) {
    pointer.y = dY + target.height / 2 - pointer.height / 2;
    edge = 'center';
  } else {
    pointer.y = dY - Math.min(target.height + (pointer.height * 1.5), 0);
    edge = 'bottomEdge';
  }

  return {
    valid,
    edge: edge as Edge
  };
}

export default class SlideConstraint extends Constraint {
  orientation: Orientation;

  constraints: Edge[];

  constructor(params: {
    orientation: Orientation;
    constraints: Edge[];
  }) {
    super();
    this.orientation = params.orientation;
    this.constraints = params.constraints;
  }

  solveFor(
    boundingRect: Rectangle,
    targetRect: Rectangle,
    popoverRect: Rectangle,
    pointerRect: Rectangle,
    positionOver: boolean
  ) {
    let orientation = this.orientation;

    // Orient the pane
    switch (orientation) {
      case 'above': {
        this.positionAbove(targetRect, popoverRect, pointerRect, positionOver);
        break;
      }
      case 'below': {
        this.positionBelow(targetRect, popoverRect, pointerRect, positionOver);
        break;
      }
      case 'left': {
        this.positionLeft(targetRect, popoverRect, pointerRect, positionOver);
        break;
      }
      case 'right': {
        this.positionRight(targetRect, popoverRect, pointerRect, positionOver);
        break;
      }
    }

    switch (orientation) {
      case 'above':
      case 'below':
        return {
          orientation,
          ...slideHorizontally(
            this.constraints as Array<'leftEdge' | 'center' | 'rightEdge'>,
            boundingRect,
            targetRect,
            popoverRect,
            pointerRect
          )
        };
      case 'left':
      case 'right':
        return {
          orientation,
          ...slideVertically(
            this.constraints as Array<'topEdge' | 'center' | 'bottomEdge'>,
            boundingRect,
            targetRect,
            popoverRect,
            pointerRect
          )
        };
      case 'center':
        return {
          valid: false,
          edge: this.constraints[0],
          orientation
        };
    }
  }
}
