import * as Math from '../math';

describe('Math', () => {
    describe('add', () => {
        it('should add all passed values and return the result', () => {
            const actual = Math.add(1,2,3);
            expect(actual).toEqual(6);
        });
    });
});