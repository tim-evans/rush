import { Constraint, Rectangle, gravity, solveFor } from '../src';

// Checks validity for all points inside of the
// rectangle by shifting a target to all positions
// inside of the bounding rect.
function getValidRect(constraints: Constraint[], hasPointer?: boolean) {
  let boundingRect = new Rectangle(0, 0, 100, 100);
  let popoverRect = new Rectangle(0, 0, 4, 4);
  let pointerRect = hasPointer ? new Rectangle(0, 0, 4, 2) : new Rectangle(0, 0, 0, 0);

  let expected = new Rectangle(0, 0, 0, 0);
  let firstX: number | null = null;
  let firstY: number | null = null;

  for (let x = 0; x < boundingRect.width; x += 0.5) {
    for (let y = 0; y < boundingRect.height; y += 0.5) {
      let targetRect = new Rectangle(x, y, 2, 2);
      let solution = solveFor(
        constraints,
        boundingRect,
        targetRect,
        popoverRect,
        pointerRect
      );

      if (solution.valid) {
        if (firstX == null) {
          firstX = x;
          expected.x = firstX;
        } else {
          expected.width = x - firstX;
        }

        if (firstY == null) {
          firstY = y;
          expected.y = firstY;
        } else {
          expected.height = y - firstY;
        }
      }
    }
  }

  return expected;
}

describe('gravity', () => {
  test('northwest', () => {
    expect(getValidRect(gravity.northWest)).toMatchObject(new Rectangle(0, 4, 96, 95.5));
    expect(getValidRect(gravity.northWest, true)).toMatchObject(new Rectangle(5, 6, 94.5, 93.5));
  });

  test('north', () => {
    expect(getValidRect(gravity.north)).toMatchObject(new Rectangle(1, 4, 96, 95.5));
    expect(getValidRect(gravity.north, true)).toMatchObject(new Rectangle(1, 6, 96, 93.5));
  });

  test('northeast', () => {
    expect(getValidRect(gravity.northEast)).toMatchObject(new Rectangle(2, 4, 96, 95.5));
    expect(getValidRect(gravity.northEast, true)).toMatchObject(new Rectangle(0, 6, 93, 93.5));
  });

  test('southwest', () => {
    expect(getValidRect(gravity.southWest)).toMatchObject(new Rectangle(0, 0, 96, 94));
    expect(getValidRect(gravity.southWest, true)).toMatchObject(new Rectangle(5, 0, 94.5, 92));
  });

  test('south', () => {
    expect(getValidRect(gravity.south)).toMatchObject(new Rectangle(1, 0, 96, 94));
    expect(getValidRect(gravity.south, true)).toMatchObject(new Rectangle(1, 0, 96, 92));
  });

  test('southeast', () => {
    expect(getValidRect(gravity.southEast)).toMatchObject(new Rectangle(2, 0, 96, 94));
    expect(getValidRect(gravity.southEast, true)).toMatchObject(new Rectangle(0, 0, 93, 92));
  });

  test('west', () => {
    expect(getValidRect(gravity.west)).toMatchObject(new Rectangle(4, 1, 95.5, 96));
    expect(getValidRect(gravity.west, true)).toMatchObject(new Rectangle(8, 1, 91.5, 96));
  });

  test('east', () => {
    expect(getValidRect(gravity.east)).toMatchObject(new Rectangle(0, 1, 94, 96));
    expect(getValidRect(gravity.east, true)).toMatchObject(new Rectangle(0, 1, 90, 96));
  });

  test('center', () => {
    expect(getValidRect(gravity.none)).toMatchObject(new Rectangle(1, 1, 96, 96));
  });
});
