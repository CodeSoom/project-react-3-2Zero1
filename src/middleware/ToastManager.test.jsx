import React from 'react';

import { render } from '@testing-library/react';
import { useDispatch, useSelector } from 'react-redux';

import ToastManager from './ToastManager';

import { initToast } from '../state/slice';

jest.mock('../services/storage');

jest.useFakeTimers();

describe('ToastManager', () => {
  const dispatch = jest.fn();

  useDispatch.mockImplementation(() => dispatch);

  const message = '에러 메시지입니다.';

  beforeEach(() => {
    dispatch.mockClear();

    useSelector.mockImplementation((selector) => selector({
      toast: {
        triggered: given.triggered,
        message: given.message,
      },
    }));
  });

  context('when trigger is true', () => {
    it('show toast', () => {
      given('triggered', () => true);
      given('message', () => message);
      const { getByText } = render(<ToastManager />);

      expect(getByText(message)).not.toBeNull();

      setTimeout(() => {}, 1600);

      jest.runAllTimers();

      expect(dispatch).toBeCalledWith(initToast());
    });
  });

  context('when trigger is false', () => {
    it('show toast', () => {
      given('triggered', () => false);
      given('message', () => message);
      const { queryByText } = render(<ToastManager />);

      expect(queryByText(message)).toBeNull();

      setTimeout(() => {}, 1600);

      jest.runAllTimers();

      expect(dispatch).not.toBeCalledWith(initToast());
    });
  });
});
