import {testValue} from './testValue';

describe(testValue.name, () => {
    it('return false if the definition is null', () => {
        expect(testValue(1, null as never)).toBe(false);
    });
});
