import build from "./builder";
import Constraint from "./constraint";
import SlideConstraint from "./constraints/slide";
import SnapConstraint from "./constraints/snap";
import gravity from "./gravity";
import Rectangle from "./rectangle";

export function scrollParent(element: HTMLElement): Element | HTMLElement {
  let position = element.style.position;
  let excludeStaticParent = position === "absolute";
  let parent = element.parentElement;

  while (parent) {
    if (excludeStaticParent && parent.style.position === "static") {
      parent = parent.parentElement;
      continue;
    }

    let { overflow, overflowX, overflowY } = window.getComputedStyle(parent);
    if (/(auto|scroll)/.test((overflow || "") + overflowX + overflowY)) {
      break;
    }
    parent = parent.parentElement;
  }

  if (parent == null) {
    return document.scrollingElement || document.documentElement;
  }

  return parent;
}

export const solveFor = (
  constraints: Constraint[],
  boundingRect: DOMRect | ClientRect | Rectangle,
  targetRect: DOMRect | ClientRect | Rectangle,
  popoverRect: DOMRect | ClientRect | Rectangle,
  pointerRect?: DOMRect | ClientRect | Rectangle
) => {
  let target = Rectangle.fromDOMRect(targetRect);
  let bounding = Rectangle.fromDOMRect(boundingRect);
  let popover = Rectangle.fromDOMRect(popoverRect);
  let pointer = new Rectangle(0, 0, 0, 0);
  if (pointerRect) {
    pointer = Rectangle.fromDOMRect(pointerRect);
  }

  let constraint =
    constraints.find(option => {
      return option.solveFor(bounding, target, popover, pointer, false).valid;
    }) || constraints[constraints.length - 1];
  let solution = constraint.solveFor(bounding, target, popover, pointer, false);

  return {
    ...solution,
    popoverRect: popover,
    pointerRect: pointer
  };
};

export {
  build,
  gravity,
  Rectangle,
  Constraint,
  SlideConstraint,
  SnapConstraint
};
