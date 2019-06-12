import Rectangle from '../src/rectangle';

describe('Rectangle', () => {
  // JSDom returns an empty rect, so test for that :/
  it('can be built from a DOMRect', () => {
    let element = document.createElement('div');

    let rect = Rectangle.fromDOMRect(element.getBoundingClientRect());
    expect(rect.top).toBe(0);
    expect(rect.left).toBe(0);
    expect(rect.width).toBe(0);
    expect(rect.height).toBe(0);
  });

  describe('intersection', () => {
    describe('overlapping', () => {
      let a = new Rectangle(0, 0, 15, 15);
      let b = new Rectangle(5, 10, 15, 15);

      it('has a rectangle that is the resultant intersection of the two', () => {
        let intersection = Rectangle.intersection(a, b);
        expect(intersection.x).toBe(5);
        expect(intersection.y).toBe(10);
        expect(intersection.width).toBe(10);
        expect(intersection.height).toBe(5);
      });

      it('intersects', () => {
        expect(a.intersects(b)).toBeTruthy();
      });
    });

    describe('non-overlapping', () => {
      let a = new Rectangle(0, 0, 5, 10);
      let b = new Rectangle(5, 10, 15, 15);

      it('returns an empty rectangle as the intersection', () => {
        let intersection = Rectangle.intersection(a, b);
        expect(intersection.x).toBe(0);
        expect(intersection.y).toBe(0);
        expect(intersection.width).toBe(0);
        expect(intersection.height).toBe(0);
      });

      it('does not intersect', () => {
        expect(a.intersects(b)).toBeFalsy();
      });
    });
  });

  describe('contains a rectangle if it is completely inside another', () => {
    let a = new Rectangle(0, 0, 100, 100);
    let b = new Rectangle(5, 10, 20, 20);

    expect(a.contains(b)).toBeTruthy();
    expect(b.contains(a)).toBeFalsy();
  });

  it('maps x to left', () => {
    let rect = new Rectangle(0, 0, 0, 0);

    expect(rect.left).toEqual(0);
    expect(rect.left).toEqual(rect.x);

    rect.x = 100;
    expect(rect.left).toEqual(100);

    rect.left = 200;
    expect(rect.x).toEqual(200);
  });

  it('maps y to top', () => {
    let rect = new Rectangle(0, 0, 0, 0);

    expect(rect.top).toEqual(0);
    expect(rect.top).toEqual(rect.y);

    rect.y = 100;
    expect(rect.top).toEqual(100);

    rect.top = 200;
    expect(rect.y).toEqual(200);
  });

  it('can be translated horizontally', () => {
    let rect = new Rectangle(10, 10, 0, 0);

    rect.translateX(10);
    expect(rect.left).toEqual(20);
  });

  it('can be translated vertically', () => {
    let rect = new Rectangle(10, 10, 0, 0);

    rect.translateY(-10);
    expect(rect.top).toEqual(0);
  });

  it('can be translated', () => {
    let rect = new Rectangle(10, 10, 0, 0);

    rect.translate(5, 10);
    expect(rect.left).toEqual(15);
    expect(rect.top).toEqual(20);
  });

  it('has a center', () => {
    let rect = new Rectangle(10, 10, 20, 50);

    expect(rect.center).toEqual([20, 35]);

    rect.width = 10;
    expect(rect.center).toEqual([15, 35]);

    rect.left = 20;
    expect(rect.center).toEqual([25, 35]);
  });

  it('has an area', () => {
    let rect = new Rectangle(10, 10, 5, 10);

    expect(rect.area).toEqual(50);

    rect.width = 20;
    expect(rect.area).toEqual(200);
  });

  it('has a bottom side', () => {
    let rect = new Rectangle(10, 10, 5, 10);

    expect(rect.bottom).toEqual(20);

    rect.height = 20;
    expect(rect.bottom).toEqual(30);
  });

  it('has a right side', () => {
    let rect = new Rectangle(10, 10, 5, 10);

    expect(rect.right).toEqual(15);

    rect.width = 25;
    expect(rect.right).toEqual(35);
  });
});
