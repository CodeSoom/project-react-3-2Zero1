import React from 'react';

import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import NotFoundPage from './NotFoundPage';

describe('NotFoundPage', () => {
  it('test', () => {
    const { getByText } = render((
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>
    ));

    expect(getByText('존재하지 않는 엽서입니다.')).not.toBeNull();
  });
});
