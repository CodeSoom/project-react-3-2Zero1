import React from 'react';

import { fireEvent, render } from '@testing-library/react';
import { useDispatch, useSelector } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import entrance from '../fixtures/entrance';
import inputFields from '../fixtures/inputFields';

import ExpirePage from './ExpirePage';

const mockGoBack = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory() {
    return { goBack: mockGoBack };
  },
}));

describe('ExpirePage', () => {
  const dispatch = jest.fn();
  useDispatch.mockImplementation(() => dispatch);

  useSelector.mockImplementation((selector) => selector({
    entrance,
    expire: {
      inputFields: {
        ...inputFields.expire,
      },
    },
  }));
  function renderExpirePage() {
    return render((
      <MemoryRouter>
        <ExpirePage />
      </MemoryRouter>
    ));
  }

  context('when previous button is clicked', () => {
    it('history calls goBack', () => {
      const { getByText } = renderExpirePage();

      expect(getByText('이전')).not.toBeNull();

      fireEvent.click(getByText('이전'));

      expect(mockGoBack).toBeCalled();
    });
  });
});
