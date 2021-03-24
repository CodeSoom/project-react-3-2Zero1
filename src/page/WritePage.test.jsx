import React from 'react';

import WritePage from './WritePage';

import { render } from '@testing-library/react';
import { useDispatch, useSelector } from 'react-redux';

test('WritePage', () => {
  // useDispatch.mockImplementation(() => dispatch);
  // useSelector.mockImplementation((selector) => selector({
  //   entrance,
  //   inputFields: inputFields,
  // }));

  const { getByText } = render(
    <WritePage />
  );
  expect(getByText('엽서 작성하기')).not.toBeNull();
});
