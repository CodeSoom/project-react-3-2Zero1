import { get, equal, getField } from './utils';

import errorMessages from '../text/errorMessages';
import placeholders from '../text/placeholders';

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

test('getField', () => {
  const id = 'sender';
  const value = 'value';
  const name = 'sender';
  const onChange = () => {};
  const withError = {
    field: { value, error: false },
    id,
    name,
    onChange,
  };
  const withoutError = {
    field: { value, error: true },
    id,
    name,
    onChange,
  };

  expect(getField(withError)).toEqual({
    id,
    name,
    value,
    placeholder: placeholders[id],
    errorMessage: '',
    onChange,
  });
  
  expect(getField(withoutError)).toEqual({
    id,
    name,
    value,
    placeholder: placeholders[id],
    errorMessage: errorMessages[id],
    onChange,
  });
});
