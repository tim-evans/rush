import Constraint from "./constraint";

export default class Orientation {

  orientation: string;

  constraints: Constraint[];

  next: Orientation | null;

  constructor(orientation: string) {
    this.orientation = orientation;
    this.constraints = [];
    this.next = null;
  }

  andSnapTo(...guidelines) {
    let orientation = this.orientation;

    this.constraints.push(...guidelines.map((guideline) => {
      return new Constraint({ orientation, behavior: 'snap', guideline });
    }));

    return this;
  }

  andSlideBetween(...guidelines) {
    // Always unshift slide constraints,
    // since they should be handled first
    this.constraints.unshift(new Constraint({
      orientation: this.orientation,
      behavior: 'slide',
      guideline: guidelines
    }));

    return this;
  }

  where(condition) {
    this.constraints.forEach((constraint) => {
      constraint.condition = condition;
    });

    return this;
  }

  then(pipeline) {
    if (pipeline !== this) {
      this.next = guideline.constraints;
    }

    return this;
  }
}
