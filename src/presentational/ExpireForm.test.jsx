import React from 'react';

import { fireEvent, render } from '@testing-library/react';

import ExpireForm from './ExpireForm';

import { getField } from '../utils/utils';

import inputFields from '../fixtures/inputFields';

describe('ExpireContainer', () => {
  const handlePreviousClick = jest.fn();
  const handleChangeSecretMessageInputField = jest.fn();
  const handleClickExpire = jest.fn();

  const { expire: { secretMessage } } = inputFields;

  const sender = '발신자';

  const secretMessageField = getField({
    field: secretMessage,
    id: 'secretMessage',
    name: '엽서 암호',
    onChange: handleChangeSecretMessageInputField,
  });

  function renderExpireForm() {
    return render((
      <ExpireForm
        sender={sender}
        secretMessageField={secretMessageField}
        onHandlePreviousClick={handlePreviousClick}
        onHandleClickExpire={handleClickExpire}
      />
    ));
  }

  it('shows ExpireForm', () => {
    const { getByText, getByPlaceholderText, getByLabelText } = renderExpireForm();

    expect(getByText('파기하기')).not.toBeNull();
    expect(getByText('이전')).not.toBeNull();

    fireEvent.click(getByText('이전'));

    expect(handlePreviousClick).toBeCalled();

    expect(getByText('발신자님으로 부터 받은 엽서를 파기하시겠습니까?')).not.toBeNull();
    expect(getByText('엽서 암호를 입력해주세요')).not.toBeNull();
    expect(getByPlaceholderText('5 ~ 20자')).not.toBeNull();

    fireEvent.change(getByLabelText('엽서 암호'), { target: { value: 'hello' } });

    expect(handleChangeSecretMessageInputField).toBeCalled();
  });
});
