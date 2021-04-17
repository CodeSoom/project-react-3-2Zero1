import React from 'react';

import { fireEvent, render } from '@testing-library/react';
import { useSelector } from 'react-redux';

import postcards from '../fixtures/postcards';

import PostcardsContainer from './PostcardsContainer';

describe('PostcardsPage', () => {
  useSelector.mockImplementation((selector) => selector({
    postcards,
  }));

  const handlePreviousClick = jest.fn();
  function renderPostcardsPage() {
    return render((
      <PostcardsContainer handlePreviousClick={handlePreviousClick} />
    ));
  }

  it('shows postcards', () => {
    const { getByText } = renderPostcardsPage();

    expect(getByText('엽서 모음')).not.toBeNull();

    expect(getByText('이전')).not.toBeNull();

    fireEvent.click(getByText('이전'));

    expect(handlePreviousClick).toBeCalled();

    postcards.forEach((postcard) => {
      expect(getByText(`${postcard.receiver}님이 받은 엽서`)).not.toBeNull();
      expect(getByText(postcard.photoMessage)).not.toBeNull();
    });
  });
});
