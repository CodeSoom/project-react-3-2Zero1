import React from 'react';

import { fireEvent, render } from '@testing-library/react';
import { useDispatch, useSelector } from 'react-redux';

import ExpireFormContainer from './ExpireFormContainer';

import { loadItem } from '../services/storage';

jest.mock('../services/storage');

loadItem.mockImplementation(() => 'test');

describe('ExpireFormContainer', () => {
  const dispatch = jest.fn();
  useDispatch.mockImplementation(() => dispatch);

  const sender = '발신자';

  useSelector.mockImplementation((selector) => selector({
    expire: {
      inputFields: {
        secretMessage: {
          error: false,
          value: given.secretMessage,
        },
      },
    },
    entrance: {
      sender,
    },
  }));

  beforeEach(() => {
    dispatch.mockClear();
  });

  const handlePreviousClick = jest.fn();
  function renderPostcardsPage() {
    return render((
      <ExpireFormContainer handlePreviousClick={handlePreviousClick} />
    ));
  }

  it('shows postcards', () => {
    given('secretMessage', () => 'secretMessage');

    const { getByText, getByLabelText } = renderPostcardsPage();

    expect(getByText('이전')).not.toBeNull();

    fireEvent.click(getByText('이전'));

    expect(handlePreviousClick).toBeCalled();

    fireEvent.change(getByLabelText('엽서 암호'), { target: { value: 'hello' } });

    expect(dispatch).toBeCalledWith({
      type: 'expire/changeInputFieldValue',
      payload: {
        type: 'secretMessage',
        value: 'hello',
      },
    });
  });

  context('with invalid secretMessage', () => {
    it('call setInputFieldsError', () => {
      given('secretMessage', () => '');

      const { getByText } = renderPostcardsPage();

      expect(getByText('파기')).not.toBeNull();
      fireEvent.click(getByText('파기'));
      expect(dispatch).toBeCalledWith({
        type: 'expire/setInputFieldsError',
        payload: {
          type: 'secretMessage',
          error: true,
        },
      });
    });
  });

  context('with valid secretMessage', () => {
    it('does not call setInputFieldsError', () => {
      given('secretMessage', () => 'secretMessage');

      const { getByText } = renderPostcardsPage();

      expect(getByText('파기')).not.toBeNull();
      fireEvent.click(getByText('파기'));
      expect(dispatch).not.toBeCalledWith({
        type: 'expire/setInputFieldsError',
        payload: {
          type: 'secretMessage',
          error: true,
        },
      });
    });
  });
});
