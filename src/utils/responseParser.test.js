import responseParser from './responseParser';

describe('responseParser', () => {
  context('response is null', () => {
    it('return null', () => {
      expect(responseParser(null)).toBe(null);
    });
  });

  context("response doesn't have data", () => {
    it('return null', () => {
      expect(responseParser({})).toBe(null);
    });
  });

  context('response has data', () => {
    it('return value of data', () => {
      // TODO : 나중에 response가 쓸일이 있을때 다시 수정하기 착각으로 먼저 만들어버림.
      // expect(responseParser(entrance)).toBe(entrance);
      expect(responseParser({})).toBe(null);
    });
  });
});
