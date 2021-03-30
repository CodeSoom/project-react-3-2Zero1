import React from 'react';

import ContentsFormContainer from './ContentsFormContainer';

import { fireEvent, getByPlaceholderText, render } from '@testing-library/react';

import { useDispatch, useSelector } from 'react-redux';

import placeholders from '../text/placeholders';

import inputFields from '../fixtures/inputFields';

describe('ContentsFormContainer', () => {
  const dispatch = jest.fn();
  const getChangeHandler = () => jest.fn();
  const handleNextClick = jest.fn();
  const handlePreviousClick = jest.fn();

  function renderContentsForm() {
    return render(
      <ContentsFormContainer
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
  
  it('show contest textarea', () => {
    const {
      getByPlaceholderText,
    } = renderContentsForm();

    expect(getByPlaceholderText(placeholders['contents'])).not.toBeNull();
  });

});
