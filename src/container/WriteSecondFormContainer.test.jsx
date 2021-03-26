import React from 'react';

import WriteSecondFormContainer from './WriteSecondFormContainer';

import { fireEvent, render } from '@testing-library/react';

import { useDispatch, useSelector } from 'react-redux';

import inputFields from '../fixtures/inputFields';

describe('WriteSecondFormContainer', () => {
  const dispatch = jest.fn();
  const getChangeHandler = () => jest.fn();
  const handleNextClick = jest.fn();
  const handlePreviousClick = jest.fn();

  function renderSecondPage() {
    return render(
      <WriteSecondFormContainer
        getChangeHandler={getChangeHandler}
        onClickNext={handleNextClick}
        onClickPrevious={handlePreviousClick}
      />
    );
  }

  useDispatch.mockImplementation(() => dispatch);
  useSelector.mockImplementation((selector) => selector(
    {
      inputFields
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

    expect(getByText('세로로 된 사진을 사용하시는걸 권장합니다.')).not.toBeNull();

    expect(getByLabelText('사진 메시지')).not.toBeNull();
    expect(getByLabelText('사진 메시지').placeholder).toBe('10 ~ 30자');

    expect(getByText('미리보기')).not.toBeNull();
  });

  context('when photo image or photoMessage field is not empty', () => {
    beforeEach(() => {
      handleNextClick.mockClear();

      useSelector.mockImplementation((selector) => selector(
        {
          inputFields: {
            ...inputFields,
            write: {
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

    it("call handleNextClick", () => {
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
          inputFields,
        },
      ));
    });

    it("do not call handleNextClick", () => {
      const {
        getByText,
      } = renderSecondPage();

      fireEvent.click(getByText('미리보기'));
      expect(handleNextClick).not.toBeCalled();
    });
  });

});