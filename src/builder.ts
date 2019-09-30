import Constraint from "./constraint";
import SlideConstraint from "./constraints/slide";
import SnapConstraint from "./constraints/snap";

export type Orientation = "above" | "below" | "left" | "right" | "center";
export type Edge =
  | "leftEdge"
  | "rightEdge"
  | "topEdge"
  | "bottomEdge"
  | "center";

class API {
  readonly topEdge = "topEdge";
  readonly bottomEdge = "bottomEdge";
  readonly leftEdge = "leftEdge";
  readonly rightEdge = "rightEdge";
  readonly center = "center";
  orientAbove: Builder;
  orientBelow: Builder;
  orientRight: Builder;
  orientLeft: Builder;
  orientCenter: Builder;

  constructor() {
    this.orientAbove = new Builder("above");
    this.orientBelow = new Builder("below");
    this.orientRight = new Builder("right");
    this.orientLeft = new Builder("left");
    this.orientCenter = new Builder("center");
  }
}

class Builder {
  orientation: Orientation;

  constraints: Constraint[];

  next: Builder | null;

  constructor(orientation: Orientation) {
    this.orientation = orientation;
    this.constraints = [];
    this.next = null;
  }

  andSnapTo(...edges: Edge[]) {
    let orientation = this.orientation;

    this.constraints.push(
      ...edges.map(edge => {
        return new SnapConstraint({
          orientation,
          constraint: edge
        });
      })
    );

    return this;
  }

  andSlideBetween(...edges: Edge[]) {
    // Always unshift slide constraints,
    // since they should be handled first
    this.constraints.unshift(
      new SlideConstraint({
        orientation: this.orientation,
        constraints: edges
      })
    );

    return this;
  }

  where(condition: () => boolean) {
    this.constraints.forEach(constraint => {
      constraint.condition = condition;
    });

    return this;
  }

  then(next: Builder) {
    if (next !== this) {
      this.next = next;
    }

    return this;
  }
}

export default function build(
  definition: (this: API) => Builder
): Constraint[] {
  let step: Builder | null = definition.call(new API());
  let constraints = [];
  while (step) {
    constraints.push(...step.constraints);
    step = step.next;
  }

  return constraints;
}
