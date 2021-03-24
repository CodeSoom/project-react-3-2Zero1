import React from 'react';

import WritePage from './WritePage';

import { render } from '@testing-library/react';
import { useDispatch, useSelector } from 'react-redux';
import inputFields from '../fixtures/inputFields';

test('WritePage', () => {
  // useDispatch.mockImplementation(() => dispatch);
  useSelector.mockImplementation((selector) => selector({
    inputFields,
  }));
  const params = { index: 0 };
  const { getByText } = render(
    <WritePage params={params} />
  );
  expect(getByText('엽서 작성하기')).not.toBeNull();
});
