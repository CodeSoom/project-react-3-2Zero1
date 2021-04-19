import React from 'react';

import { fireEvent, render } from '@testing-library/react';
import { useDispatch, useSelector } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import entrance from '../fixtures/entrance';
import inputFields from '../fixtures/inputFields';

import ExpirePage from './ExpirePage';

const mockGoBack = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory() {
    return { goBack: mockGoBack };
  },
}));

describe('ExpirePage', () => {
  const dispatch = jest.fn();
  useDispatch.mockImplementation(() => dispatch);

  useSelector.mockImplementation((selector) => selector({
    entrance,
    inputFields,
  }));
  function renderExpirePage() {
    return render((
      <MemoryRouter>
        <ExpirePage />
      </MemoryRouter>
    ));
  }

  it('renders expire page', () => {
    const { getByText, getByPlaceholderText, getByLabelText } = renderExpirePage();

    expect(getByText('파기하기')).not.toBeNull();

    expect(getByText('이전')).not.toBeNull();

    fireEvent.click(getByText('이전'));

    expect(mockGoBack).toBeCalled();

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
