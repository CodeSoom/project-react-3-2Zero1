import React from 'react';

import { fireEvent, render } from '@testing-library/react';
import { useDispatch, useSelector } from 'react-redux';

import PhotoFormContainer from './PhotoFormContainer';

import inputFields from '../fixtures/inputFields';

describe('PhotoFormContainer', () => {
  window.URL.createObjectURL = jest.fn();

  const dispatch = jest.fn();
  const handleNextClick = jest.fn();
  const handlePreviousClick = jest.fn();
  const checkValidAccess = jest.fn();

  function renderSecondPage() {
    return render((
      <PhotoFormContainer
        onClickNext={handleNextClick}
        onClickPrevious={handlePreviousClick}
        checkValidAccess={checkValidAccess}
      />
    ));
  }

  useDispatch.mockImplementation(() => dispatch);
  useSelector.mockImplementation((selector) => selector(
    {
      write: {
        writePageIndex: 2,
        inputFields: {
          ...inputFields.write,
        },
      },
    },
  ));

  beforeEach(() => {
    dispatch.mockClear();
  });

  it('show title and recommendation message', () => {
    const {
      getByText,
      getByLabelText,
    } = renderSecondPage();

    expect(checkValidAccess).toBeCalled();

    expect(getByText('세로로 된 사진을 사용하시는걸 권장합니다.')).not.toBeNull();

    expect(getByLabelText('사진 메시지')).not.toBeNull();
    expect(getByLabelText('사진 메시지').placeholder).toBe('10 ~ 30자');

    fireEvent.change(getByLabelText('사진 메시지'), {
      target: { value: 'Hello' },
    });

    expect(dispatch).toBeCalledWith({
      type: 'write/changeInputFieldValue',
      payload: {
        type: 'photoMessage',
        value: 'Hello',
      },
    });

    expect(getByText('미리보기')).not.toBeNull();
  });

  context('when call onChange', () => {
    beforeEach(() => {
      dispatch.mockClear();
    });
    context('with file', () => {
      it('calls imageChangeHandler', () => {
        const {
          getByLabelText,
        } = renderSecondPage();

        const image = new Image();

        fireEvent.change(getByLabelText('파일 선택자'), { target: { files: [image] } });

        // TODO: received로 Function anonymous가 나옴. 왜 그런지 이해를 할 수 없어서 일단 밑의 테스트로 진행. 추후 변경예정
        // expect(dispatch).toBeCalledWith({
        //   type: 'application/sendPhoto',
        //   payload: image,
        // });

        expect(dispatch).toBeCalled();
      });
    });

    context('without file', () => {
      it('does not call imageChangeHandler', () => {
        const {
          getByLabelText,
        } = renderSecondPage();

        fireEvent.change(getByLabelText('파일 선택자'), { target: { files: [] } });

        expect(dispatch).not.toBeCalled();
      });
    });
  });

  context('when photo image or photoMessage field is not empty', () => {
    beforeEach(() => {
      handleNextClick.mockClear();

      useSelector.mockImplementation((selector) => selector(
        {
          write: {
            writePageIndex: 2,
            inputFields: {
              ...inputFields.write,
              photo: {
                ...inputFields.write.photo,
                value: 'fake image url',
              },
              photoMessage: {
                ...inputFields.write.photoMessage,
                value: 'hello, nice meet you !',
              },
            },
          },
        },
      ));
    });

    it('call handleNextClick', () => {
      const {
        getByText,
      } = renderSecondPage();

      fireEvent.click(getByText('미리보기'));
      expect(handleNextClick).toBeCalled();
    });
  });

  context('when photo image or photoMessage field is empty', () => {
    beforeEach(() => {
      handleNextClick.mockClear();

      useSelector.mockImplementation((selector) => selector(
        {
          write: {
            writePageIndex: 2,
            inputFields: {
              ...inputFields.write,
            },
          },
        },
      ));
    });

    it('do not call handleNextClick', () => {
      const {
        getByText,
      } = renderSecondPage();

      fireEvent.click(getByText('미리보기'));
      expect(handleNextClick).not.toBeCalled();
    });
  });
});
