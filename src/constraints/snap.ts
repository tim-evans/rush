import { Edge, Orientation } from '../builder';
import Constraint from '../constraint';
import Rectangle from '../rectangle';

export default class SnapConstraint extends Constraint {
  orientation: Orientation;

  constraint: Edge;

  constructor(params: {
    orientation: Orientation;
    constraint: Edge;
  }) {
    super();
    this.orientation = params.orientation;
    this.constraint = params.constraint;
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

    if (this.constraint === 'center') {
      switch (this.orientation) {
      case 'above':
      case 'below':
        this.horizontallyCenter(targetRect, popoverRect, pointerRect);
        break;
      case 'left':
      case 'right':
        this.verticallyCenter(targetRect, popoverRect, pointerRect);
        break;
      case 'center':
        this.horizontallyCenter(targetRect, popoverRect, pointerRect);
        this.verticallyCenter(targetRect, popoverRect, pointerRect);
        break;
      }
    } else {
      let horizontalOffset = Math.min(targetRect.width / 2 - (pointerRect.width * 1.5), 0);
      let verticalOffset = Math.min(targetRect.height / 2 - (pointerRect.height * 1.5), 0);
      switch (this.constraint) {
      case 'leftEdge':
        popoverRect.x = targetRect.left + horizontalOffset;
        pointerRect.x = pointerRect.width;
        break;
      case 'rightEdge':
        popoverRect.x = targetRect.right - horizontalOffset - popoverRect.width;
        pointerRect.x = popoverRect.width - pointerRect.width * 2;
        break;
      case 'topEdge':
        popoverRect.y = targetRect.top + verticalOffset;
        pointerRect.y = pointerRect.height;
        break;
      case 'bottomEdge':
        popoverRect.y = targetRect.bottom - verticalOffset - popoverRect.height;
        pointerRect.y = popoverRect.height - pointerRect.height * 2;
        break;
      }
    }

    return {
      orientation: this.orientation,
      edge: this.constraint,
      valid: boundingRect.contains(popoverRect)
    };
  }
}
