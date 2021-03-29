import React from 'react';

import PostcardPage from './PostcardPage';

import { fireEvent, render } from '@testing-library/react';
import { useDispatch, useSelector } from 'react-redux';
import { MemoryRouter, } from 'react-router-dom';



describe('PostcardPage', () => {
  const dispatch = jest.fn();

  useDispatch.mockImplementation(() => dispatch);

  useSelector.mockImplementation((selector) => selector({
    postcard: {
      isFront: true,
      sender: '보낸이',
      receiver: '받는이',
      contents: '이것은 내용입니다.',
    }
  }) );

  function renderPostcardPage() {
    return render(
      <MemoryRouter>
        <PostcardPage />
      </MemoryRouter>
    );
  }

  context('when isFront is true', () => {
    it('show front Page', () => {
      const { getByText } = renderPostcardPage();
      expect(getByText('to 받는이')).not.toBeNull();
      expect(getByText('from 보낸이')).not.toBeNull();
      expect(getByText('이것은 내용입니다.')).not.toBeNull();
    });
  });
});
