import { Edge, Orientation } from './builder';
import Rectangle from './rectangle';

export default abstract class Constraint {
  condition?: (target: Rectangle, popover: Rectangle, pointer: Rectangle) => boolean;

  abstract solveFor(
    boundingRect: Rectangle,
    targetRect: Rectangle,
    popoverRect: Rectangle,
    pointerRect: Rectangle,
    positionOver: boolean
  ): {
    orientation: Orientation;
    edge: Edge;
    valid: boolean;
  };

  horizontallyCenter(target: Rectangle, popover: Rectangle, pointer: Rectangle) {
    popover.x = target.left + target.width / 2 - popover.width / 2;
    pointer.x = popover.width / 2 - pointer.width / 2;
  }

  verticallyCenter(target: Rectangle, popover: Rectangle, pointer: Rectangle) {
    popover.y = target.top + target.height / 2 - popover.height / 2;
    pointer.y = popover.height / 2 - pointer.height / 2;
  }

  positionAbove(target: Rectangle, popover: Rectangle, pointer: Rectangle, positionOver: boolean) {
    let shiftY = positionOver ? 0 : popover.height + pointer.height;
    popover.y = target.top - shiftY;
    pointer.y = popover.height;
  }

  positionBelow(target: Rectangle, popover: Rectangle, pointer: Rectangle, positionOver: boolean) {
    let shiftY = positionOver ? -1 * popover.height :  pointer.height;
    popover.y = target.bottom + shiftY;
    pointer.y = pointer.height * -1;
  }

  positionLeft(target: Rectangle, popover: Rectangle, pointer: Rectangle, positionOver: boolean) {
    let shiftX = positionOver ? 0 : popover.width + pointer.width;
    popover.x = target.left - shiftX;
    pointer.x = popover.width;
  }

  positionRight(target: Rectangle, popover: Rectangle, pointer: Rectangle, positionOver: boolean) {
    const shiftX = positionOver ? (-1 * popover.width) : pointer.width;
    popover.x = target.right + shiftX;
    pointer.x = pointer.width * -1;
  }

  positionCenter(target: Rectangle, popover: Rectangle, pointer: Rectangle) {
    this.horizontallyCenter(target, popover, pointer);
    this.verticallyCenter(target, popover, pointer);
  }
}
