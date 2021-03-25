import validator from './validator';

test('validator', () => {
  expect(validator.sender('')).toBe(false);
  expect(validator.sender('test')).toBe(true);
  expect(validator.sender('이것은 이름 길이 체크 테스트 입니다.')).toBe(false);

  expect(validator.receiver('')).toBe(false);
  expect(validator.receiver('test')).toBe(true);
  expect(validator.receiver('이것은 이름 길이 체크 테스트 입니다.')).toBe(false);

  expect(validator.secretMessage('test')).toBe(false);
  expect(validator.secretMessage('testtest')).toBe(true);
  expect(validator.secretMessage('이것은 비밀 메시지 길이 체크 테스트 입니다. !!!!')).toBe(false);

  expect(validator.photoMessage('test')).toBe(false);
  expect(validator.photoMessage('이것은 사진 메시지 길이 체크')).toBe(true);
  expect(validator.photoMessage('이것은 사진 메시지 길이 체크 테스트 입니다. !!!!')).toBe(false);

});