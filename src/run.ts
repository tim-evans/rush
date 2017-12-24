import Rectangle from './rectangle';
import Constraint from './constraint';
import { getLayout } from 'dom-ruler';

function run(constraints: Constraint[], targetArea: DOMRect, $popover: HTMLElement, $pointer?: HTMLElement) {
  let $container = scrollParent($popover);
  let target = Rectangle.fromDOMRect(targetArea);
  let popover = new Rectangle(0, 0, 0, 0);
  let pointer = new Rectangle(0, 0, 0, 0);

  let solution = constraints.find(function (constraint) {
    constraint.solveFor(boundary, target, popover);
  });

  let isHidden = Rectangle.intersection(boundingRect, targetRect).area === 0;

  if (boundingElement === document.scrollingElement) {
    popover.translateY(-1, $container.scrollTop);
    popover.translateX(-1, $container.scrollLeft);
    target.translateY(-1, $container.scrollTop);
    target.translateX(-1, $container.scrollLeft);
  }

  if (animated) {
    let [centerX, centerY] = target.center();
    $container.style.top = centerY + 'px';
    $container.style.left = centerX + 'px';

    $popover.style.top = (popover.top - centerY) + 'px';
    $popover.style.left = (popover.left - centerX) + 'px';
    $popover.style.width = popover.width + 'px';
    $popover.style.height = popover.height + 'px';
  } else {
    $popover.style.top = popover.top + 'px';
    $popover.style.left = popover.left + 'px';
    $popover.style.width = popover.width + 'px';
    $popover.style.height = popover.height + 'px';
  }

  if ($pointer) {
    $pointer.style.top = pointer.top + 'px';
    $pointer.style.left = pointer.left + 'px';
  }
}

function scrollParent(element: HTMLElement): HTMLElement {
  let position = element.style.position;
  let excludeStaticParent = position === 'absolute';
  let parent = element.parentElement;

  while (parent) {
    if (excludeStaticParent && parent.style.position === 'static') {
      parent = parent.parentElement;
      continue;
    }

    let { overflow, overflowX, overflowY } = parent.style;
    if (/(auto|scroll)/.test(overflow + overflowX + overflowY)) {
      break;
    }
    parent = parent.parentElement;
  }

  if (parent == null) {
    parent = document.scrollingElement;
  }

  return position === 'fixed' || parent;
}
