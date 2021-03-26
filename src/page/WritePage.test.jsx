import React from 'react';

import WritePage from './WritePage';

import { fireEvent, render } from '@testing-library/react';
import { useDispatch, useSelector } from 'react-redux';
import { MemoryRouter, } from 'react-router-dom';

import inputFields from '../fixtures/inputFields';

const mockPush = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory() {
    return { goBack: mockPush };
  },
}));

describe('WritePage', () => {
  const dispatch = jest.fn();

  useDispatch.mockImplementation(() => dispatch);
  function renderWritePage() {
    return render(
      <MemoryRouter>
        <WritePage />
      </MemoryRouter>
    );
  }

  context('when writePageIndex is 0', () => {
    beforeEach(() => {
      useSelector.mockImplementation((selector) => selector({
        writePageIndex: 0,
        inputFields,
      }));
    });

    it('render firstPage', () => {
      const {
        getByText,
      } = renderWritePage();

      expect(getByText('엽서 작성하기')).not.toBeNull();
      expect(getByText('이전')).not.toBeNull();

      fireEvent.click(getByText('이전'));

      expect(dispatch).not.toBeCalled();
    });
  });

  context('when writePageIndex is 1', () => {
    beforeEach(() => {
      useSelector.mockImplementation((selector) => selector({
        writePageIndex: 1,
        inputFields,
      }));
    });

    it('render secondPage', () => {
      const {
        getByText,
      } = renderWritePage();

      expect(getByText('이미지 첨부')).not.toBeNull();

      expect(getByText('이전')).not.toBeNull();

      fireEvent.click(getByText('이전'));

      expect(dispatch).toBeCalledWith({
        type: 'application/decreaseWritePageIndex',
      });
    });
  });
});
