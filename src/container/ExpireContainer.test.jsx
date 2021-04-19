import React from 'react';

import { fireEvent, render } from '@testing-library/react';
import { useDispatch, useSelector } from 'react-redux';

import ExpireContainer from './ExpireContainer';

import { loadItem } from '../services/storage';

jest.mock('../services/storage');

loadItem.mockImplementation(() => 'test');

describe('ExpireContainer', () => {
  const dispatch = jest.fn();
  useDispatch.mockImplementation(() => dispatch);

  const sender = '발신자';

  useSelector.mockImplementation((selector) => selector({
    entrance: {
      sender,
    },
    inputFields: {
      expire: {
        secretMessage: {
          error: false,
          value: given.secretMessage,
        },
      },
    },
  }));

  beforeEach(() => {
    dispatch.mockClear();
  });

  const handlePreviousClick = jest.fn();
  function renderPostcardsPage() {
    return render((
      <ExpireContainer handlePreviousClick={handlePreviousClick} />
    ));
  }

  it('shows postcards', () => {
    given('secretMessage', () => 'secretMessage');

    const { getByText, getByPlaceholderText, getByLabelText } = renderPostcardsPage();

    expect(getByText('파기하기')).not.toBeNull();

    expect(getByText('이전')).not.toBeNull();

    fireEvent.click(getByText('이전'));

    expect(handlePreviousClick).toBeCalled();

    expect(getByText('발신자님으로 부터 받은 엽서를 파기하시겠습니까?')).not.toBeNull();

    expect(getByText('엽서 암호를 입력해주세요')).not.toBeNull();

    expect(getByPlaceholderText('5 ~ 20자')).not.toBeNull();

    fireEvent.change(getByLabelText('엽서 암호'), { target: { value: 'hello' } });

    expect(dispatch).toBeCalledWith({
      type: 'application/changeInputFieldValue',
      payload: {
        page: 'expire',
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
        type: 'application/setInputFieldsError',
        payload: {
          page: 'expire',
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
        type: 'application/setInputFieldsError',
        payload: {
          page: 'expire',
          type: 'secretMessage',
          error: true,
        },
      });
    });
  });
});
