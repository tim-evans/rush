import Rectangle from './rectangle';

function horizontallyCenter(target, popover, pointer) {
  popover.setX(target.left + target.width / 2 - popover.width / 2);
  pointer.setX(popover.width / 2 - pointer.width / 2);
}

function verticallyCenter(target, popover, pointer) {
  popover.setY(target.top + target.height / 2 - popover.height / 2);
  pointer.setY(popover.height / 2 - pointer.height / 2);
}

function slideHorizontally(guidelines, boundary, target, popover, pointer) {
  let edges = {
    'left-edge':  Math.min(target.width / 2 - (pointer.width * 1.5), 0),
    'center':    (target.width / 2 - popover.width / 2),
    'right-edge': target.width - popover.width
  };
  let range = guidelines.map(function (guideline) {
    return edges[guideline];
  }).sort((a, b) => a - b);

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
  let oneThird = (edges['left-edge'] - edges['right-edge']) / 3;
  let pointerClassName;

  if (dX < oneThird) {
    pointer.x = dX + Math.min(pointer.width, target.width / 2 - pointer.width * 1.5);
    pointerClassName = 'left-edge';
  } else if (dX < oneThird * 2) {
    pointer.x = dX + target.width / 2 - pointer.width / 2;
    pointerClassName = 'center';
  } else {
    pointer.x = dX + target.width - pointer.width * 1.5;
    pointerClassName = 'right-edge';
  }

  return {
    valid,
    pointer: pointerClassName
  };
}

function slideVertically(guidelines, boundary, target, popover, pointer) {
  let edges = {
    'top-edge':    Math.min(target.height / 2 - (pointer.height * 1.5), 0),
    'center':      (target.height / 2 - popover.height / 2),
    'bottom-edge': target.height - popover.height
  };
  let range = guidelines.map(function (guideline) {
    return edges[guideline];
  }).sort((a, b) => a - b);

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
  let oneThird = (edges['top-edge'] - edges['bottom-edge']) / 3;
  let pointerClassName;

  if (dY < oneThird) {
    pointer.y = dY + pointer.height + Math.min(target.height / 2 - (pointer.height * 1.5), 0);
    pointerClassName = 'top-edge';
  } else if (dY < oneThird * 2) {
    pointer.y = dY + target.height / 2 - pointer.height / 2;
    pointerClassName = 'center';
  } else {
    pointer.y = dY - Math.min(target.height + (pointer.height * 1.5), 0);
    pointerClassName = 'bottom-edge';
  }

  return {
    valid,
    pointer: pointerClassName
  };
}

export default class Constraint {

  orientation: string;

  behavior: string;

  constraint: string|string[];

  constructor(orientation: string, behavior: string, constraint: string) {
    this.orientation = orientation;
    this.behavior = behavior;
    this.constraint = constraint;
  }

  solveFor(boundingRect: Rectangle, targetRect: Rectangle, popoverRect: Rectangle, pointerRect: Rectangle, positionOver: boolean) {
    let orientation = this.orientation;
    let result = {
      orientation,
      valid: true
    };

    // Orient the pane
    this['position' + orientation[0].toUpperCase() + orientation.slice(1)](
      targetRect,
      popoverRect,
      pointerRect,
      positionOver
    );

    // The pane should slide in the direction specified by the flow
    if (this.behavior === 'slide') {
      switch (orientation) {
      case 'above':
      case 'below':
        let { valid, pointer } = slideHorizontally(this.guideline, boundingRect, targetRect, popoverRect, pointerRect, positionOver);
        result.valid = valid;
        result.pointer = pointer;
        break;
      case 'left':
      case 'right':
          let { valid, pointer } = slideVertically(this.guideline, boundingRect, targetRect, popoverRect, pointerRect, positionOver);
        result.valid = valid;
        result.pointer = pointer;
        break;
      }

    } else if (this.behavior === 'snap') {
      result.pointer = this.guideline;
      if (this.guideline === 'center') {
        switch (this.orientation) {
        case 'above':
        case 'below':
          horizontallyCenter(targetRect, popoverRect, pointerRect);
          break;
        case 'left':
        case 'right':
          verticallyCenter(targetRect, popoverRect, pointerRect);
          break;
        case 'center':
          horizontallyCenter(targetRect, popoverRect, pointerRect);
          verticallyCenter(targetRect,popoverRect, pointerRect);
          break;
        }
      } else {
        this.snapTo(this.guideline, targetRect, popoverRect, pointerRect);
      }
    }

    result.valid = result.valid && boundingRect.contains(popoverRect);
    return result;
  }

  positionAbove(target: Rectangle, popover: Rectangle, pointer: Rectangle, over: Rectangle, positionOver: boolean) {
    let shiftY = positionOver ? 0 : popover.height + pointer.height;
    popover.y = target.top - shiftY;
    pointer.y = popover.height;
  }

  positionBelow(target: Rectangle, popover: Rectangle, pointer: Rectangle, over: Rectangle, positionOver: boolean) {
    let shiftY = over ? -1 * popover.height :  pointer.height;
    popover.y = target.bottom + shiftY;
    pointer.y = pointer.height * -1;
  }

  positionLeft(target: Rectangle, popover: Rectangle, pointer: Rectangle, over: Rectangle, positionOver: boolean) {
    let shiftX = over ? 0 : popover.width + pointer.width;
    popover.x = target.left - shiftX;
    pointer.x = popover.width;
  }

  positionRight(target: Rectangle, popover: Rectangle, pointer: Rectangle, over: Rectangle, positionOver: boolean) {
    const shiftX = over ? (-1 * popover.width) : pointer.width;
    popover.x = target.right + shiftX;
    pointer.x = pointer.width * -1;
  }

  positionCenter(target: Rectangle, popover: Rectangle, pointer: Rectangle, over: Rectangle, positionOver: boolean) {
    horizontallyCenter(target, popover, pointer);
    verticallyCenter(target, popover, pointer);
  }

  snapTo(edge: string, target: Rectangle, popover: Rectangle, pointer: Rectangle) {
    let horizontalOffset = Math.min(target.width / 2 - (pointer.width * 1.5), 0);
    let verticalOffset = Math.min(target.height / 2 - (pointer.height * 1.5), 0);
    switch (direction) {
    case 'left-edge':
      popover.x = target.left + horizontalOffset;
      pointer.x = pointer.width;
      break;
    case 'right-edge':
      popover.x = target.right - horizontalOffset - popover.width;
      pointer.x = popover.width - pointer.width * 2;
      break;
    case 'top-edge':
      popover.y = target.top + verticalOffset;
      pointer.y = pointer.height;
      break;
    case 'bottom-edge':
      popover.y = target.bottom - verticalOffset - popover.height;
      pointer.y = popover.height - pointer.height * 2;
      break;
    }
  }
}
