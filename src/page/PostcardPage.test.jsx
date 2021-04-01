import React from 'react';

import { fireEvent, render } from '@testing-library/react';
import { useDispatch, useSelector } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import PostcardPage from './PostcardPage';

const mockGoBack = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory() {
    return { goBack: mockGoBack };
  },
}));

describe('PostcardPage', () => {
  const dispatch = jest.fn();

  useDispatch.mockImplementation(() => dispatch);

  function renderPostcardPage() {
    return render((
      <MemoryRouter>
        <PostcardPage />
      </MemoryRouter>
    ));
  }

  context('when isFrontPage is true', () => {
    it('shows front Page', () => {
      useSelector.mockImplementation((selector) => selector({
        postcard: {
          isFrontPage: true,
          sender: '보낸이',
          receiver: '받는이',
          contents: '이것은 내용입니다.',
          stampURL: 'http://fpost.co.kr/board/data/editor/1905/af0187ebd1e86d0b3a359707fba988b3_1557538963_0631.jpg',
          photoURL: 'http://fpost.co.kr/board/data/editor/1905/af0187ebd1e86d0b3a359707fba988b3_1557538963_0631.jpg',
          photoMessage: 'ㄱ나니? 너와 그때 그시절.....',
        },
      }));
      const { getByText } = renderPostcardPage();
      expect(getByText('to 받는이')).not.toBeNull();
      expect(getByText('from 보낸이')).not.toBeNull();
      expect(getByText('이것은 내용입니다.')).not.toBeNull();

      fireEvent.click(getByText('이전'));
      // expect(mockGoBack).toBeCalled();
      // TODO : 어떻게 테스트하지 ?
      expect(dispatch).toBeCalledWith({
        type: 'application/setPostcardFront',
      });
    });
  });

  context('when isFrontPage is false', () => {
    it('shows back Page', () => {
      useSelector.mockImplementation((selector) => selector({
        postcard: {
          isFrontPage: false,
          sender: '보낸이',
          receiver: '받는이',
          contents: '이것은 내용입니다.',
          stampURL: 'http://fpost.co.kr/board/data/editor/1905/af0187ebd1e86d0b3a359707fba988b3_1557538963_0631.jpg',
          photoURL: 'http://fpost.co.kr/board/data/editor/1905/af0187ebd1e86d0b3a359707fba988b3_1557538963_0631.jpg',
          photoMessage: 'ㄱ나니? 너와 그때 그시절.....',
        },
      }));
      const { getByText } = renderPostcardPage();
      expect(getByText('ㄱ나니? 너와 그때 그시절.....')).not.toBeNull();
    });
  });
});
