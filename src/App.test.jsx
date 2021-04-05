import React from 'react';

import { render } from '@testing-library/react';

import {
  MemoryRouter,
} from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import App from './App';

import entrance from './fixtures/entrance';
import inputFields from './fixtures/inputFields';

describe('App', () => {
  const { sender } = entrance;

  const dispatch = jest.fn();

  beforeEach(() => {
    useDispatch.mockImplementation(() => dispatch);
    useSelector.mockImplementation((selector) => selector({
      writePageIndex: 0,
      entrance,
      inputFields,
      postcard: {
        isFrontPage: true,
        sender: '받는이',
        receiver: '보낸이',
        contents: '이것은 내용입니다.',
      },
    }));
  });

  function renderApp({ path }) {
    return render((
      <MemoryRouter initialEntries={[path]}>
        <App />
      </MemoryRouter>
    ));
  }

  context('when path is /', () => {
    it('renders entrancePage', () => {
      const { container } = renderApp({ path: `/entrance/${sender}` });

      expect(container).toHaveTextContent(sender);
    });
  });

  context('when path is /write', () => {
    it('renders writingPage', () => {
      const { container } = renderApp({ path: '/write/0' });

      expect(container).toHaveTextContent('엽서 작성하기');
    });
  });

  context('when path is /postcard', () => {
    it('renders postcardPage', () => {
      const { container } = renderApp({ path: '/postcard' });

      expect(container).toHaveTextContent('to');
      expect(container).toHaveTextContent('from');
    });
  });
});
