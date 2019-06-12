import build from './builder';
import Constraint from './constraint';
import SlideConstraint from './constraints/slide';
import SnapConstraint from './constraints/snap';
import gravity from './gravity';
import Rectangle from './rectangle';

export function scrollParent(element: HTMLElement): Element | HTMLElement {
  let position = element.style.position;
  let excludeStaticParent = position === 'absolute';
  let parent = element.parentElement;

  while (parent) {
    if (excludeStaticParent && parent.style.position === 'static') {
      parent = parent.parentElement;
      continue;
    }

    let { overflow, overflowX, overflowY } = parent.style;
    if (/(auto|scroll)/.test((overflow || '') + overflowX + overflowY)) {
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
  $element: HTMLElement,
  targetArea: DOMRect | ClientRect,
  $pointer?: HTMLElement
) => {
  let $container = scrollParent($element);
  let target = Rectangle.fromDOMRect(targetArea);
  let container = Rectangle.fromDOMRect($container.getBoundingClientRect());
  let popover = Rectangle.fromDOMRect($element.getBoundingClientRect());
  let pointer = new Rectangle(0, 0, 0, 0);
  if ($pointer) {
    pointer = Rectangle.fromDOMRect($pointer.getBoundingClientRect());
  }

  let constraint = constraints.find(option => {
    return option.solveFor(container, target, popover, pointer, false);
  })!;
  let solution = constraint.solveFor(container, target, popover, pointer, false);

  if ($container === document.scrollingElement) {
    popover.translate(-1 * $container.scrollLeft, -1 * $container.scrollTop);
    target.translate(-1 * $container.scrollLeft, -1 * $container.scrollTop);
  }

  return {
    ...solution,
    rect: popover,
    pointerRect: pointer
  };
};

export { build, gravity, Rectangle, Constraint, SlideConstraint, SnapConstraint };
