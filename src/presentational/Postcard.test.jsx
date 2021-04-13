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

  const handleClickPage = jest.fn();
  const onHandlePrivousClick = jest.fn();
  const handleCompleteClick = jest.fn();

  function renderPostcard({
    showCompleteButton,
    isFrontPage,
  }) {
    return render((
      <Postcard
        postcard={postcard}
        isFrontPage={isFrontPage}
        onHandleClickPage={handleClickPage}
        onHandlePrivousClick={onHandlePrivousClick}
        showCompleteButton={showCompleteButton}
        onHandleCompleteClick={handleCompleteClick}
      />
    ));
  }

  context('when isFrontPage false and showCompleteButton is true', () => {
    it('renders complete button', () => {
      const { getByText } = renderPostcard({
        showCompleteButton: true,
        isFrontPage: false,
      });

      expect(getByText('완료')).not.toBeNull();

      fireEvent.click(getByText('완료'));

      expect(handleCompleteClick).toBeCalled();
    });
  });
});
