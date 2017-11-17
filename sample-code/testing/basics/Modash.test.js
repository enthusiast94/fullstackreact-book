// We write the tests for the Modash library in
// this file in the Unit Testing chapter

import Modash from './Modash';

describe("test suite", () => {
    describe("truncate", () => {
        it("should truncate when string length greater than length param", () => {
            const actual = Modash.truncate('there was one catch, and that was CATCH-22', 19);
            const expected = 'there was one catch...';
            expect(actual).toBe(expected);
        });

        it("should not truncate when string length smaller than or equal to length param", () => {
            const actual = Modash.truncate("hello boy", 9);
            const expected = "hello boy";
            expect(actual).toBe(expected);
        });
    });
});