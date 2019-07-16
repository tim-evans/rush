import { Constraint, Rectangle, gravity, solveFor } from '../src';

// Checks validity for all points inside of the
// rectangle by shifting a target to all positions
// inside of the bounding rect.
function validIn(constraints: Constraint[], rect: Rectangle) {
  let boundingRect = new Rectangle(0, 0, 100, 100);
  let popoverRect = new Rectangle(0, 0, 4, 4);

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
        popoverRect
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

  expect(expected).toMatchObject(rect);
}

describe('gravity', () => {
  test('northwest', () => {
    validIn(gravity.nw, new Rectangle(0, 4, 96, 95.5));
  });

  test('north', () => {
    validIn(gravity.n, new Rectangle(1, 4, 96, 95.5));
  });

  test('northeast', () => {
    validIn(gravity.ne, new Rectangle(2, 4, 96, 95.5));
  });

  test('southwest', () => {
    validIn(gravity.sw, new Rectangle(0, 0, 96, 94));
  });

  test('south', () => {
    validIn(gravity.s, new Rectangle(1, 0, 96, 94));
  });

  test('southeast', () => {
    validIn(gravity.se, new Rectangle(2, 0, 96, 94));
  });

  test('west', () => {
    validIn(gravity.w, new Rectangle(4, 1, 95.5, 96));
  });

  test('east', () => {
    validIn(gravity.e, new Rectangle(0, 1, 94, 96));
  });

  test('center', () => {
    validIn(gravity.none, new Rectangle(1, 1, 96, 96));
  });
});
