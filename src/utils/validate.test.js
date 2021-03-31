import validate from './validate';

test('validate', () => {
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
