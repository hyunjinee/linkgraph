import { isNumeric } from '.';

describe('validations utils', () => {
  it('isNumeric, 주어진 string이 숫자만 포함되어 있는지 검사할 수 있다.', () => {
    expect(isNumeric('010')).toEqual(true);
    expect(isNumeric('abc')).toEqual(false);
    expect(isNumeric('abc0')).toEqual(false);
    expect(isNumeric('0가나다')).toEqual(false);
  });
});
