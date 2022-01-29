import Math from '../index';

describe('Math', () => {
    it('should export a Math object', () => {
        expect(Math).not.toBeNull();
    });

    it('should export have an add member', () => {
        expect(Math.add).not.toBeNull();
    });
});
