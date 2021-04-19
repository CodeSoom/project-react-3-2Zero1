import React from 'react';

import { fireEvent, render } from '@testing-library/react';
import { useDispatch, useSelector } from 'react-redux';

import inputFields from '../fixtures/inputFields';

import ExpireContainer from './ExpireContainer';

describe('ExpireContainer', () => {
  const dispatch = jest.fn();
  useDispatch.mockImplementation(() => dispatch);

  const sender = '발신자';

  useSelector.mockImplementation((selector) => selector({
    entrance: {
      sender,
    },
    inputFields,
  }));

  const handlePreviousClick = jest.fn();
  function renderPostcardsPage() {
    return render((
      <ExpireContainer handlePreviousClick={handlePreviousClick} />
    ));
  }

  it('shows postcards', () => {
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

    expect(getByText('파기')).not.toBeNull();
  });
});
