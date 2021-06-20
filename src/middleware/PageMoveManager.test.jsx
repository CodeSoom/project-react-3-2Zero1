import React from 'react';

import { render } from '@testing-library/react';
import { useDispatch, useSelector } from 'react-redux';

import PageMoveManager from './PageMoveManager';

import { loadItem } from '../services/storage';

const mockPush = jest.fn();

jest.mock('../services/storage');

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory() {
    return { push: mockPush };
  },
}));

describe('PageMoveManager', () => {
  const dispatch = jest.fn();

  useDispatch.mockImplementation(() => dispatch);

  useSelector.mockImplementation((selector) => selector({
    common: {
      movingPage: given.movingPage,
      toast: {
        triggered: given.triggered || false,
        message: given.message || '',
      },
    },
  }));

  beforeEach(() => {
    mockPush.mockClear();
    dispatch.mockClear();
  });

  context('when movingpage is empty', () => {
    it('does not push in history', () => {
      given('movingPage', () => '');

      render((<PageMoveManager />));

      expect(mockPush).not.toBeCalled();
    });
  });

  context('when movingpage is entrance', () => {
    it('push entrance page in history', () => {
      given('movingPage', () => 'entrance');

      loadItem.mockImplementation(() => 'test');

      render((<PageMoveManager />));

      expect(mockPush).toBeCalledWith(`/?key=${loadItem('key')}`);

      expect(dispatch).toBeCalledWith({ type: 'application/initMovingPage' });
    });
  });

  context('when movingpage is postcard', () => {
    it('push postcard page in history', () => {
      given('movingPage', () => 'postcard');

      render((<PageMoveManager />));

      expect(mockPush).toBeCalledWith('/postcard');

      expect(dispatch).toBeCalledWith({ type: 'application/initMovingPage' });
    });
  });

  context('when movingpage is notfound', () => {
    it('push notfound page in history', () => {
      given('movingPage', () => 'notfound');

      render((<PageMoveManager />));

      expect(mockPush).toBeCalledWith('/notfound');

      expect(dispatch).toBeCalledWith({ type: 'application/initMovingPage' });
    });
  });

  context('with message in toast', () => {
    it('change triggered with true', () => {
      given('movingPage', () => 'notfound');
      given('trigger', () => false);
      given('message', () => '토스트 메시지');

      render((<PageMoveManager />));

      expect(dispatch).toBeCalledWith({
        type: 'application/setToastTriggered',
        payload: true,
      });
    });
  });

  context('without message in toast', () => {
    it('change triggered with true', () => {
      given('movingPage', () => 'notfound');
      given('trigger', () => false);
      given('message', () => '');

      render((<PageMoveManager />));

      expect(dispatch).not.toBeCalledWith({
        type: 'application/setToastTriggered',
        payload: true,
      });
    });
  });
});
