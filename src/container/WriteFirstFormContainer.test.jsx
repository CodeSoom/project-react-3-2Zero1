import React from 'react';

import WriteFirstFormContainer from './WriteFirstFormContainer';

import { fireEvent, render } from '@testing-library/react';

import { useDispatch, useSelector } from 'react-redux';

import placeholders from '../text/placeholders';

import inputFields from '../fixtures/inputFields';

describe('WriteFirstFormContainer', () => {
  const dispatch = jest.fn();
  const getChangeHandler = () => jest.fn();
  const handleNextClick = jest.fn();
  const handlePreviousClick = jest.fn();

  function renderFirstPage() {
    return render(
      <WriteFirstFormContainer
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
  
  it('show sender inputs', () => {
    const {
      getByLabelText,
    } = renderFirstPage();

    expect(getByLabelText('보내는 사람')).not.toBeNull();
    expect(getByLabelText('보내는 사람').placeholder).toBe(placeholders['sender']);
  });

  it('show receiver inputs', () => {
    const {
      getByLabelText,
    } = renderFirstPage();

    expect(getByLabelText('받는 사람')).not.toBeNull();
    expect(getByLabelText('받는 사람').placeholder).toBe(placeholders['receiver']);

  });

  it('show secretMessage inputs and information message and next Button', () => {
    const {
      getByText,
      getByLabelText,
    } = renderFirstPage();

    expect(getByLabelText('비밀 메시지')).not.toBeNull();
    expect(getByLabelText('비밀 메시지').placeholder).toBe(placeholders['secretMessage']);
    expect(getByText('엽서를 확인 또는 파기하기 위해 사용되며 받는 사람에게도 공유됩니다.')).not.toBeNull();

    expect(getByText('다음')).not.toBeNull();
  });
});
