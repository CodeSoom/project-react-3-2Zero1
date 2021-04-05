import React from 'react';

import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import TestPage from './TestPage';

describe('WritePage', () => {
  it('test', () => {
    const { getByText } = render((
      <MemoryRouter>
        <TestPage />
      </MemoryRouter>
    ));

    expect(getByText('test hello')).not.toBeNull();
  });
});
