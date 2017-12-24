import build from './constraint-builder';

export default {
  nw: build(() => this.orientAbove.andSnapTo('left-edge')),
  n:  build(() => this.orientAbove.andSnapTo('center')),
  ne: build(() => this.orientAbove.andSnapTo('right-edge')),
  e:  build(() => this.orientRight.andSnapTo('center')),
  se: build(() => this.orientBelow.andSnapTo('right-edge')),
  s:  build(() => this.orientBelow.andSnapTo('center')),
  sw: build(() => this.orientBelow.andSnapTo('left-edge')),
  w:  build(() => this.orientLeft.andSnapTo('center')),
  none: build(() => this.orientCenter.andSnapTo('center'))
};
