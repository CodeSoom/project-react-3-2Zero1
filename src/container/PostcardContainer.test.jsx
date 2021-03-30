import React from 'react';

import { fireEvent, getByText, render } from '@testing-library/react';

import PostcardContainer from '../container/PostcardContainer';

import { useDispatch, useSelector } from 'react-redux';
describe('PostcardContainer', () => {
  const dispatch = jest.fn();
  function renderPostcard() {
    return render(
      <PostcardContainer />
    );
  }

  useDispatch.mockImplementation(() => dispatch);
  useSelector.mockImplementation((selector) => selector(
    {
      postcard: {
        isFrontPage: true,
        sender: '보낸이',
        receiver: '받는이',
        contents: '이것은 내용입니다.',
        stampURL: 'http://fpost.co.kr/board/data/editor/1905/af0187ebd1e86d0b3a359707fba988b3_1557538963_0631.jpg',
        photoURL: 'http://fpost.co.kr/board/data/editor/1905/af0187ebd1e86d0b3a359707fba988b3_1557538963_0631.jpg',
        photoMessage: 'ㄱ나니? 너와 그때 그시절.....',
      }
    }
  ));
  
  context('when isFrontPage is true', () => {
    it('show front Page', () => {
      useSelector.mockImplementation((selector) => selector({
        postcard: {
          isFrontPage: true,
          sender: '보낸이',
          receiver: '받는이',
          contents: '이것은 내용입니다.',
          stampURL: 'http://fpost.co.kr/board/data/editor/1905/af0187ebd1e86d0b3a359707fba988b3_1557538963_0631.jpg',
          photoURL: 'http://fpost.co.kr/board/data/editor/1905/af0187ebd1e86d0b3a359707fba988b3_1557538963_0631.jpg',
          photoMessage: 'ㄱ나니? 너와 그때 그시절.....',
        }
      }));
      const { getByText } = renderPostcard();
      expect(getByText('to 받는이')).not.toBeNull();
      expect(getByText('from 보낸이')).not.toBeNull();
      expect(getByText('이것은 내용입니다.')).not.toBeNull();
    });
  });

  context('when isFrontPage is false', () => {
    it('show back Page', () => {
      useSelector.mockImplementation((selector) => selector({
        postcard: {
          isFrontPage: false,
          sender: '보낸이',
          receiver: '받는이',
          contents: '이것은 내용입니다.',
          stampURL: 'http://fpost.co.kr/board/data/editor/1905/af0187ebd1e86d0b3a359707fba988b3_1557538963_0631.jpg',
          photoURL: 'http://fpost.co.kr/board/data/editor/1905/af0187ebd1e86d0b3a359707fba988b3_1557538963_0631.jpg',
          photoMessage: 'ㄱ나니? 너와 그때 그시절.....',
        }
      }));
      const { getByText } = renderPostcard();
      expect(getByText('ㄱ나니? 너와 그때 그시절.....')).not.toBeNull();
    });
  });
  context('when click page and previuous button', () => {
    it('change isFrontPage oppositely', () => {
      useSelector.mockImplementation((selector) => selector({
        postcard: {
          isFrontPage: true,
          sender: '보낸이',
          receiver: '받는이',
          contents: '이것은 내용입니다.',
          stampURL: 'http://fpost.co.kr/board/data/editor/1905/af0187ebd1e86d0b3a359707fba988b3_1557538963_0631.jpg',
          photoURL: 'http://fpost.co.kr/board/data/editor/1905/af0187ebd1e86d0b3a359707fba988b3_1557538963_0631.jpg',
          photoMessage: 'ㄱ나니? 너와 그때 그시절.....',
        }
      }));
      const { getByText } = renderPostcard();
      fireEvent.click(getByText('to 받는이'));
      
      expect(dispatch).toBeCalledWith({
        type: 'application/flipPostcard'
      });
    });
  });
});
