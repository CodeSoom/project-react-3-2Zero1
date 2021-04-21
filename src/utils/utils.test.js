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
  const onChange = jest.fn();

  context('without error', () => {
    const id = 'sender';
    const withValue = 'sender';
    const name = 'sender';
    it('return fields without errorMessage', () => {
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

  context('with error', () => {
    const id = 'secretMessage';
    const withoutValue = '';
    const name = 'secretMessage';
    context('when error is default', () => {
      it('return fields with default errorMessage', () => {
        expect(getField({
          field: { value: withoutValue, error: 'wrong' },
          id,
          name,
          onChange,
        })).toEqual({
          id,
          name,
          value: withoutValue,
          placeholder: placeholders[id],
          errorMessage: errorMessages[id].wrong,
          onChange,
        });
      });
    });
    context('when error is other error', () => {
      it('return fields with other errorMessage', () => {
        expect(getField({
          field: { value: withoutValue, error: 'wrong' },
          id,
          name,
          onChange,
        })).toEqual({
          id,
          name,
          value: withoutValue,
          placeholder: placeholders[id],
          errorMessage: errorMessages[id].wrong,
          onChange,
        });
      });
    });
  });
});
