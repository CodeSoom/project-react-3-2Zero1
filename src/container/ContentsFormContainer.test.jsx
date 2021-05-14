import React from 'react';

import { fireEvent, render } from '@testing-library/react';

import { useDispatch, useSelector } from 'react-redux';

import ContentsFormContainer from './ContentsFormContainer';

import placeholders from '../text/placeholders';
import inputFields from '../fixtures/inputFields';

describe('ContentsFormContainer', () => {
  const dispatch = jest.fn();
  const handleNextClick = jest.fn();
  const handlePreviousClick = jest.fn();
  const checkValidAccess = jest.fn();

  function renderContentsForm() {
    return render((
      <ContentsFormContainer
        onClickNext={handleNextClick}
        onClickPrevious={handlePreviousClick}
        checkValidAccess={checkValidAccess}
      />
    ));
  }

  useDispatch.mockImplementation(() => dispatch);
  useSelector.mockImplementation((selector) => selector(
    {
      writePageIndex: 1,
      inputFields,
    },
  ));

  it('shows contents textarea and checks access is valid', () => {
    const {
      getByPlaceholderText,
    } = renderContentsForm();

    expect(getByPlaceholderText(placeholders.contents)).not.toBeNull();
    expect(checkValidAccess).toBeCalled();
  });

  context('when contents is changed', () => {
    it('calls changeHandler', () => {
      const {
        getByPlaceholderText,
      } = renderContentsForm();

      fireEvent.change(getByPlaceholderText(placeholders.contents), {
        target: { value: 'Hello' },
      });

      expect(dispatch).toBeCalledWith({
        type: 'application/changeInputFieldValue',
        payload: {
          page: 'write',
          type: 'contents',
          value: 'Hello',
        },
      });
    });
  });

  // TODO: handleClick을 리팩터링한 후에 추가한다.
  // context('when next button is clicked', () => {
  //   it('goes to next page', () => {

  //   })
  // });
});
