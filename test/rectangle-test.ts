import Rectangle from "../src/rectangle";

describe("Rectangle", () => {
  // JSDom returns an empty rect, so test for that :/
  test("building from a DOMRect", () => {
    let element = document.createElement("div");

    let rect = Rectangle.fromDOMRect(element.getBoundingClientRect());
    expect(rect.top).toBe(0);
    expect(rect.left).toBe(0);
    expect(rect.width).toBe(0);
    expect(rect.height).toBe(0);
  });

  test("building from a Rectangle", () => {
    let rect = Rectangle.fromDOMRect(new Rectangle(1, 2, 3, 4));
    expect(rect.top).toBe(2);
    expect(rect.left).toBe(1);
    expect(rect.width).toBe(3);
    expect(rect.height).toBe(4);
  });

  test("cloning returns a copy of the Rectangle", () => {
    let rect = new Rectangle(1, 2, 3, 4);
    let clone = rect.clone();
    expect(rect).not.toBe(clone);

    rect.left = 2;
    expect(rect.left).toBe(2);
    expect(clone.left).toBe(1);
  });

  describe("intersection", () => {
    describe("overlapping", () => {
      let a = new Rectangle(0, 0, 15, 15);
      let b = new Rectangle(5, 10, 15, 15);

      test("has a rectangle that is the resultant intersection of the two", () => {
        let intersection = Rectangle.intersection(a, b);
        expect(intersection.x).toBe(5);
        expect(intersection.y).toBe(10);
        expect(intersection.width).toBe(10);
        expect(intersection.height).toBe(5);
      });

      test("intersects", () => {
        expect(a.intersects(b)).toBeTruthy();
      });
    });

    describe("non-overlapping", () => {
      let a = new Rectangle(0, 0, 5, 10);
      let b = new Rectangle(5, 10, 15, 15);

      test("an empty rectangle as the intersection", () => {
        let intersection = Rectangle.intersection(a, b);
        expect(intersection.x).toBe(0);
        expect(intersection.y).toBe(0);
        expect(intersection.width).toBe(0);
        expect(intersection.height).toBe(0);
      });

      test("does not intersect", () => {
        expect(a.intersects(b)).toBeFalsy();
      });
    });
  });

  describe("contains a rectangle if it is completely inside another", () => {
    let a = new Rectangle(0, 0, 100, 100);
    let b = new Rectangle(5, 10, 20, 20);

    expect(a.contains(b)).toBeTruthy();
    expect(b.contains(a)).toBeFalsy();
  });

  test("x <=> left", () => {
    let rect = new Rectangle(0, 0, 0, 0);

    expect(rect.left).toEqual(0);
    expect(rect.left).toEqual(rect.x);

    rect.x = 100;
    expect(rect.left).toEqual(100);

    rect.left = 200;
    expect(rect.x).toEqual(200);
  });

  test("y <=> top", () => {
    let rect = new Rectangle(0, 0, 0, 0);

    expect(rect.top).toEqual(0);
    expect(rect.top).toEqual(rect.y);

    rect.y = 100;
    expect(rect.top).toEqual(100);

    rect.top = 200;
    expect(rect.y).toEqual(200);
  });

  test("horizontally translate", () => {
    let rect = new Rectangle(10, 10, 0, 0);

    rect.translateX(10);
    expect(rect.left).toEqual(20);
  });

  test("vertically translate", () => {
    let rect = new Rectangle(10, 10, 0, 0);

    rect.translateY(-10);
    expect(rect.top).toEqual(0);
  });

  test("translate", () => {
    let rect = new Rectangle(10, 10, 0, 0);

    rect.translate(5, 10);
    expect(rect.left).toEqual(15);
    expect(rect.top).toEqual(20);
  });

  test("center", () => {
    let rect = new Rectangle(10, 10, 20, 50);

    expect(rect.center).toEqual([20, 35]);

    rect.width = 10;
    expect(rect.center).toEqual([15, 35]);

    rect.left = 20;
    expect(rect.center).toEqual([25, 35]);
  });

  test("area", () => {
    let rect = new Rectangle(10, 10, 5, 10);

    expect(rect.area).toEqual(50);

    rect.width = 20;
    expect(rect.area).toEqual(200);
  });

  test("bottom side", () => {
    let rect = new Rectangle(10, 10, 5, 10);

    expect(rect.bottom).toEqual(20);

    rect.height = 20;
    expect(rect.bottom).toEqual(30);
  });

  test("right side", () => {
    let rect = new Rectangle(10, 10, 5, 10);

    expect(rect.right).toEqual(15);

    rect.width = 25;
    expect(rect.right).toEqual(35);
  });
});
