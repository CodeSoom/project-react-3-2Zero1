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
    movingPage: given.movingPage,
  }));

  context('when movingpage is entrance', () => {
    it('push entrance page in history', () => {
      given('movingPage', () => 'entrance');

      loadItem.mockImplementation(() => 'test');

      render((<PageMoveManager />));

      expect(mockPush).toBeCalledWith(`/entrance?key=${loadItem('key')}`);
    });
  });

  context('when movingpage is postcard', () => {
    it('push postcard page in history', () => {
      given('movingPage', () => 'postcard');

      render((<PageMoveManager />));

      expect(mockPush).toBeCalledWith('/postcard');
    });
  });

  context('when movingpage is notfound', () => {
    it('push notfound page in history', () => {
      given('movingPage', () => 'notfound');

      render((<PageMoveManager />));

      expect(mockPush).toBeCalledWith('/notfound');
    });
  });
});
