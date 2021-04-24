import React from 'react';

import { fireEvent, render } from '@testing-library/react';
import { useDispatch, useSelector } from 'react-redux';

import PreviewContainer from './PreviewContainer';

import inputFields from '../fixtures/inputFields';

describe('PreviewContainer', () => {
  const dispatch = jest.fn();

  const handleCompleteClick = jest.fn();
  const handlePreviousClick = jest.fn();
  const checkValidAccess = jest.fn();

  function renderSecondPage() {
    return render((
      <PreviewContainer
        onClickNext={handleCompleteClick}
        onClickPrevious={handlePreviousClick}
        checkValidAccess={checkValidAccess}
      />
    ));
  }
  useDispatch.mockImplementation(() => dispatch);
  useSelector.mockImplementation((selector) => selector(
    {
      writePageIndex: 3,
      inputFields: {
        ...inputFields,
        write: {
          ...inputFields.write,
          sender: {
            error: false,
            value: '보낸이',
          },
          receiver: {
            error: false,
            value: '받는이',
          },
          photoMessage: {
            error: false,
            value: '사진 메시지 입니다. 테스트 용으로 입력한 값입니다. ! !!!',
          },
          preview: {
            isFrontPage: given.isFrontPage,
          },
        },
      },
    },
  ));

  context('when isFirstPage is true', () => {
    given('isFrontPage', () => true);
    it('show front page', () => {
      const { getByText } = renderSecondPage();

      expect(checkValidAccess).toBeCalled();

      fireEvent.click(getByText('뒷면'));
      expect(getByText('뒷면')).not.toBeNull();

      expect(dispatch).toBeCalledWith({
        type: 'application/flipPreviewPostcard',
      });
    });
  });

  context('when isFirstPage is false', () => {
    given('isFrontPage', () => false);
    it('show back page', () => {
      const { getByText } = renderSecondPage();

      expect(checkValidAccess).toBeCalled();

      expect(getByText('사진 메시지 입니다. 테스트 용으로 입력한 값입니다. ! !!!')).not.toBeNull();
    });
    it('show complete button', () => {
      const { getByText } = renderSecondPage();
      expect(getByText('완료')).not.toBeNull();
    });
  });
});
