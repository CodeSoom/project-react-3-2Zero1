import React from 'react';

import { render } from '@testing-library/react';

import { useDispatch, useSelector } from 'react-redux';

import ContentsFormContainer from './ContentsFormContainer';

import placeholders from '../text/placeholders';
import inputFields from '../fixtures/inputFields';

describe('ContentsFormContainer', () => {
  const dispatch = jest.fn();
  const getChangeHandler = () => jest.fn();
  const handleNextClick = jest.fn();
  const handlePreviousClick = jest.fn();
  const checkValidAccess = jest.fn();

  function renderContentsForm() {
    return render((
      <ContentsFormContainer
        getChangeHandler={getChangeHandler}
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

  it('show contents textarea', () => {
    const {
      getByPlaceholderText,
    } = renderContentsForm();

    expect(getByPlaceholderText(placeholders.contents)).not.toBeNull();

    expect(checkValidAccess).toBeCalled();
  });
});
