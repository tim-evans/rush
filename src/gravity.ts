import build from './builder';

export default {
  nw: build(function() {
    return this.orientAbove.andSnapTo(this.leftEdge);
  }),
  n: build(function() {
    return this.orientAbove.andSnapTo(this.center);
  }),
  ne: build(function() {
    return this.orientAbove.andSnapTo(this.rightEdge);
  }),
  e: build(function() {
    return this.orientRight.andSnapTo(this.center);
  }),
  se: build(function() {
    return this.orientBelow.andSnapTo(this.rightEdge);
  }),
  s: build(function() {
    return this.orientBelow.andSnapTo(this.center);
  }),
  sw: build(function() {
    return this.orientBelow.andSnapTo(this.leftEdge);
  }),
  w: build(function() {
    return this.orientLeft.andSnapTo(this.center);
  }),
  none: build(function() {
    return this.orientCenter.andSnapTo(this.center);
  })
};
