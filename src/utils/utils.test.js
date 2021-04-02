import errorMessages from '../text/errorMessages';
import placeholders from '../text/placeholders';
import { get, equal, getField } from './utils';

test('get', () => {
  const state = {
    name: '홍길동',
  };
  const f = get('name');
  const g = get('age');

  expect(f(state)).toBe('홍길동');
  expect(g(state)).toBeUndefined();
});

test('equal', () => {
  const state = {
    name: '홍길동',
  };

  const f = equal('name', '홍길동');
  const g = equal('name', '임꺽정');

  expect(f(state)).toBeTruthy();
  expect(g(state)).toBeFalsy();
});

describe('getFields', () => {
  const id = 'sender';
  const withValue = 'sender';
  const withoutValue = '';
  const name = 'sender';

  const onChange = jest.fn();

  context('with error', () => {
    it('return fields with errorMessage', () => {
      expect(getField({
        field: { value: withValue, error: false },
        id,
        name,
        onChange,
      })).toEqual({
        id,
        name,
        value: withValue,
        placeholder: placeholders[id],
        errorMessage: '',
        onChange,
      });
    });
  });

  context('without error', () => {
    it('return fields without errorMessage', () => {
      expect(getField({
        field: { value: withoutValue, error: true },
        id,
        name,
        onChange,
      })).toEqual({
        id,
        name,
        value: withoutValue,
        placeholder: placeholders[id],
        errorMessage: errorMessages[id],
        onChange,
      });
    });
  });
});
