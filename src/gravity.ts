import build from './constraint-builder';

export default {
  nw: build(function () {
    return this.orientAbove.andSnapTo('left-edge');
  }),
  n: build(function () {
    return this.orientAbove.andSnapTo('center');
  }),
  ne: build(function () {
    return this.orientAbove.andSnapTo('right-edge');
  }),
  e: build(function () {
    return this.orientRight.andSnapTo('center');
  }),
  se: build(function () {
    return this.orientBelow.andSnapTo('right-edge');
  }),
  s: build(function () {
    return this.orientBelow.andSnapTo('center');
  }),
  sw: build(function () {
    return this.orientBelow.andSnapTo('left-edge');
  }),
  w: build(function () {
    return this.orientLeft.andSnapTo('center');
  }),
  none: build(function () {
    return this.orientCenter.andSnapTo('center');
  })
};
