import React from 'react';

import { fireEvent, render } from '@testing-library/react';
import { useDispatch, useSelector } from 'react-redux';

import PostcardContainer from './PostcardContainer';

describe('PostcardContainer', () => {
  const dispatch = jest.fn();

  const onHandlePreviousClick = jest.fn();

  function renderPostcard() {
    return render((
      <PostcardContainer
        onHandlePreviousClick={onHandlePreviousClick}
      />
    ));
  }

  useDispatch.mockImplementation(() => dispatch);

  beforeEach(() => {
    dispatch.mockClear();
  });
  useSelector.mockImplementation((selector) => selector(
    {
      postcard: {
        isFrontPage: given.isFrontPage,
        sender: '보낸이',
        receiver: '받는이',
        contents: '이것은 내용입니다.',
        photoUrl: 'http://fpost.co.kr/board/data/editor/1905/af0187ebd1e86d0b3a359707fba988b3_1557538963_0631.jpg',
        photoMessage: 'ㄱ나니? 너와 그때 그시절.....',
      },
    },
  ));

  context('when isFrontPage is true', () => {
    given('isFrontPage', () => true);
    it('show front Page', () => {
      const { getByText } = renderPostcard();
      expect(getByText('to 받는이')).not.toBeNull();
      expect(getByText('from 보낸이')).not.toBeNull();
      expect(getByText('이것은 내용입니다.')).not.toBeNull();

      fireEvent.click(getByText('이전'));
      expect(onHandlePreviousClick).toBeCalled();
    });
    context("when click '뒷면' button", () => {
      it('change isFrontPage oppositely', () => {
        const { getByText } = renderPostcard();
        fireEvent.click(getByText('뒷면'));

        expect(dispatch).toBeCalledWith({
          type: 'application/flipPostcard',
        });
      });
    });
  });

  context('when isFrontPage is false', () => {
    given('isFrontPage', () => false);
    it('show back Page', () => {
      const { getByText } = renderPostcard();
      expect(getByText('ㄱ나니? 너와 그때 그시절.....')).not.toBeNull();
    });
  });
  context("when click '앞면' button", () => {
    it('change isFrontPage oppositely', () => {
      const { getByText } = renderPostcard();
      fireEvent.click(getByText('앞면'));

      expect(dispatch).toBeCalledWith({
        type: 'application/flipPostcard',
      });
    });
  });
});
