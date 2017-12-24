import Constraint from './constraint';
import Orientation from './orientation';

class ConstraintBuilder {
  topEdge: string;
  bottomEdge: string;
  leftEdge: string;
  rightEdge: string;
  center: string;
  orientAbove: Orientation;
  orientBelow: Orientation;
  orientRight: Orientation;
  orientLeft: Orientation;
  orientCenter: Orientation;

  constructor() {
    this.topEdge = 'top-edge';
    this.bottomEdge = 'bottom-edge';
    this.leftEdge = 'left-edge';
    this.rightEdge = 'right-edge';
    this.center = 'center';
    this.orientAbove = new Orientation('above');
    this.orientBelow = new Orientation('below');
    this.orientRight = new Orientation('right');
    this.orientLeft = new Orientation('left');
    this.orientCenter = new Orientation('center');
  }
}

interface ConstraintDefinition {
  (): Orientation
}

export default function (definition: ConstraintDefinition): Constraint[] {
  let step = definition.call(new ConstraintBuilder());
  let constraints = [];
  do {
    constraints.push(step.constraints);
    if (step.next) {
      step = step.next;
    }
  } while (step.next);

  return constraints;
}
