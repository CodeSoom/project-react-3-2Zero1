import React from 'react';

import WriteFirstFormContainer from './WriteFirstFormContainer';

import { fireEvent, render } from '@testing-library/react';

import { useDispatch, useSelector } from 'react-redux';

import placeholders from '../text/placeholders';

import inputFields from '../fixtures/inputFields';

describe('WriteFirstFormContainer', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    dispatch.mockClear();
  });

  useDispatch.mockImplementation(() => dispatch);
  useSelector.mockImplementation((selector) => selector(
    {
      inputFields
    },
  ));
  
  it('show sender inputs', () => {
    const {
      getByText,
      getByLabelText,
      getByPlaceholderText,
    } = render(<WriteFirstFormContainer />);

    expect(getByLabelText('보내는 사람')).not.toBeNull();
    expect(getByLabelText('보내는 사람').placeholder).toBe(placeholders['sender']);
    fireEvent.change(getByLabelText('보내는 사람'), { target: {value: 'tester'} });
    expect(dispatch).toBeCalled();
  });

  it('show receiver inputs', () => {
    const {
      getByText,
      getByLabelText,
      getByPlaceholderText,
    } = render(<WriteFirstFormContainer />);

    expect(getByLabelText('받는 사람')).not.toBeNull();
    expect(getByLabelText('받는 사람').placeholder).toBe(placeholders['receiver']);
    fireEvent.change(getByLabelText('받는 사람'), { target: {value: 'tester'} });
    expect(dispatch).toBeCalled();

  });

  it('show secretMessage inputs and information message', () => {
    const {
      getByText,
      getByLabelText,
      getByPlaceholderText,
    } = render(<WriteFirstFormContainer />);

    expect(getByLabelText('비밀 메시지')).not.toBeNull();
    expect(getByLabelText('비밀 메시지').placeholder).toBe(placeholders['secretMessage']);
    fireEvent.change(getByLabelText('받는 사람'), { target: {value: 'secret'} });
    expect(dispatch).toBeCalled();
    expect(getByText('엽서를 확인 또는 파기하기 위해 사용되며 받는 사람에게도 공유됩니다.')).not.toBeNull();
  });

});
