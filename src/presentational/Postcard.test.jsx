import React from 'react';

import { fireEvent, render } from '@testing-library/react';

import Postcard from './Postcard';

describe('Postcard', () => {
  const postcard = {
    isFrontPage: true,
    sender: '보낸이',
    receiver: '받는이',
    contents: '이것은 내용입니다.',
    stampURL: 'http://fpost.co.kr/board/data/editor/1905/af0187ebd1e86d0b3a359707fba988b3_1557538963_0631.jpg',
    photoUrl: 'http://fpost.co.kr/board/data/editor/1905/af0187ebd1e86d0b3a359707fba988b3_1557538963_0631.jpg',
    photoMessage: 'ㄱ나니? 너와 그때 그시절.....',
  };

  const handleClickFlip = jest.fn();
  const onHandlePreviousClick = jest.fn();
  const handleCompleteClick = jest.fn();

  function renderPostcard({
    showCompleteButton,
    isFrontPage,
  }) {
    return render((
      <Postcard
        postcard={postcard}
        isFrontPage={isFrontPage}
        onHandleClickFlip={handleClickFlip}
        onHandlePreviousClick={onHandlePreviousClick}
        showCompleteButton={showCompleteButton}
        onHandleCompleteClick={handleCompleteClick}
      />
    ));
  }

  context('when isFrontPage true', () => {
    it('renders back page', () => {
      const { getByText } = renderPostcard({
        showCompleteButton: true,
        isFrontPage: true,
      });

      expect(getByText('from 보낸이')).not.toBeNull();
      expect(getByText('to 받는이')).not.toBeNull();
      expect(getByText('이것은 내용입니다.')).not.toBeNull();
    });
  });

  context('when isFrontPage false and showCompleteButton is true', () => {
    it('renders front', () => {
      const { getByText } = renderPostcard({
        showCompleteButton: true,
        isFrontPage: false,
      });

      expect(getByText('ㄱ나니? 너와 그때 그시절.....')).not.toBeNull();

      expect(getByText('완료')).not.toBeNull();

      fireEvent.click(getByText('완료'));

      expect(handleCompleteClick).toBeCalled();
    });
  });

  context('when isFrontPage false and showCompleteButton is false', () => {
    it('renders front but does not show complete button', () => {
      const { getByText, queryByText } = renderPostcard({
        showCompleteButton: false,
        isFrontPage: false,
      });

      expect(getByText('ㄱ나니? 너와 그때 그시절.....')).not.toBeNull();

      expect(queryByText('완료')).toBeNull();
    });
  });
});
