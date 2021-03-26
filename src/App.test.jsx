import React from 'react';

import App from './App';

import { render } from '@testing-library/react';

import {
  MemoryRouter,
} from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import entrance from './fixtures/entrance';
import inputFields from './fixtures/inputFields';

describe('App', () => {
  const { sender } = entrance;

  const dispatch = jest.fn();

  beforeEach(() => {
    useDispatch.mockImplementation(() => dispatch);
    useSelector.mockImplementation((selector) => selector({
      entrance,
      inputFields: inputFields,
    }));
  });

  function renderApp({ path }) {
    return render((
      <MemoryRouter initialEntries={[path]}>
        <App />
      </MemoryRouter>
    ));
  }
  
  context('with /', () => {
    it('renders entrancePage', () => {
      const { container } = renderApp({ path: '/' });

      expect(container).toHaveTextContent(sender);
    });
  });
  
});
