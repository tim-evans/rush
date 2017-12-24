export default class Rectangle {
  static intersection(rectA: Rectangle, rectB: Rectangle): Rectangle {
    // Find the edges
    let x = Math.max(rectA.x, rectB.x);
    let y = Math.max(rectA.y, rectB.y);
    let right  = Math.min(rectA.right, rectB.right);
    let bottom = Math.min(rectA.bottom, rectB.bottom);
    let width, height;

    if (rectA.right <= rectB.left ||
        rectB.right <= rectA.left ||
        rectA.bottom <= rectB.top ||
        rectB.bottom <= rectA.top) {
      x = y = width = height = 0;
    } else {
      width  = Math.max(0, right - x);
      height = Math.max(0, bottom - y);
    }

    return new Rectangle(x, y, width, height);
  }

  static fromDOMRect(rect: DOMRect): Rectangle {
    return new Rectangle(rect.x, rect.y, rect.width, rect.height);
  }

  left: number;
  top: number;
  width: number;
  height: number;

  constructor(x: number, y: number, width: number, height: number) {
    this.left = x;
    this.top = y;
    this.width = width;
    this.height = height;
  }

  get right(): number {
    return this.left + this.width;
  }

  get bottom(): number {
    return this.top + this.height;
  }

  get area(): number {
    return this.width * this.height;
  }

  intersects(rect: number): boolean {
    return Rectangle.intersection(this, rect).area > 0;
  }

  contains(rect: Rectangle): boolean {
    return Rectangle.intersection(this, rect).area === rect.area;
  }

  center(): [number, number] {
    return [this.left + this.width / 2, this.top + this.height / 2];
  }

  translateX(dX: number) {
    this.left = this.left + dX;
    this.right += dX;
  }

  translateY(dY: number) {
    this.top = this.top + dY;
    this.bottom += dY;
  }

  translate(dX: number, dY: number) {
    this.translateX(dX);
    this.translateY(dY);
  }

  get x() : number {
    return this.left;
  }

  set x(value: number) {
    this.translateX(value - this.left);
  }

  get y(): number {
    return this.top;
  }

  set y(value: number) {
    this.translateY(value - this.top);
  }
}
