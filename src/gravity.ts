import build from './builder';

export default {
  northWest: build(function() {
    return this.orientAbove.andSnapTo(this.leftEdge);
  }),
  north: build(function() {
    return this.orientAbove.andSnapTo(this.center);
  }),
  northEast: build(function() {
    return this.orientAbove.andSnapTo(this.rightEdge);
  }),
  east: build(function() {
    return this.orientRight.andSnapTo(this.center);
  }),
  southEast: build(function() {
    return this.orientBelow.andSnapTo(this.rightEdge);
  }),
  south: build(function() {
    return this.orientBelow.andSnapTo(this.center);
  }),
  southWest: build(function() {
    return this.orientBelow.andSnapTo(this.leftEdge);
  }),
  west: build(function() {
    return this.orientLeft.andSnapTo(this.center);
  }),
  none: build(function() {
    return this.orientCenter.andSnapTo(this.center);
  })
};
