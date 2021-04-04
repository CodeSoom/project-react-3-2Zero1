import validate from './validate';

describe('validate', () => {
  context('when the value is satisfied condition', () => {
    it('return array with name and true', () => {
      expect(validate({
        sender: {
          value: 'name',
          error: false,
        },
        receiver: {
          value: 'name2',
          error: false,
        },
      })).toEqual([
        ['sender', true], ['receiver', true],
      ]);
    });
  });

  context('when the value is not satisfied condition', () => {
    it('return array with name and false', () => {
      expect(validate({
        sender: {
          value: '',
          error: false,
        },
        receiver: {
          value: '',
          error: false,
        },
      })).toEqual([
        ['sender', false], ['receiver', false],
      ]);
    });
  });
});
