import React from 'react';

import WriteContainer from './WriteContainer';

import { fireEvent, render } from '@testing-library/react';

import { useDispatch, useSelector } from 'react-redux';

test('WriteContainer', () => {
 
  const { getByText } = render(<WriteContainer />);

  expect(getByText('엽서 작성하기')).not.toBeNull();
});
