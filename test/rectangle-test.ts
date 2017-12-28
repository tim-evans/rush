import { Rectangle } from "@tim-evans/rush";

console.log(Rectangle);
describe('Rectangle', function () {
    describe('intersection', function () {
        describe('overlapping', function () {
            let a = new Rectangle(0, 0, 15, 15);
            let b = new Rectangle(5, 10, 15, 15);

            it('has a rectangle that is the resultant intersection of the two', function () {
                let intersection = Rectangle.intersection(a, b);
                expect(intersection.x).toBe(5);
                expect(intersection.y).toBe(10);
                expect(intersection.width).toBe(10);
                expect(intersection.height).toBe(5);
            });

            it('intersects', function () {
                expect(a.intersects(b)).toBeTruthy();
            });
        });

        describe('non-overlapping', function () {
            let a = new Rectangle(0, 0, 5, 10);
            let b = new Rectangle(5, 10, 15, 15);
            it('returns an empty rectangle as the intersection', function () {
                let intersection = Rectangle.intersection(a, b);
                expect(intersection.x).toBe(0);
                expect(intersection.y).toBe(0);
                expect(intersection.width).toBe(0);
                expect(intersection.height).toBe(0);
            });

            it('does not intersect', function () {
                expect(a.intersects(b)).toBeFalsy();
            });
        });

    });

    describe('contains a rectangle if it is completely inside another', function () {
        let a = new Rectangle(0, 0, 100, 100);
        let b = new Rectangle(5, 10, 20, 20);

        expect(a.contains(b)).toBeTruthy();
        expect(b.contains(a)).toBeFalsy();

    });
});
