import React from 'react';

import WriteFirstForm from './WriteFirstForm';

import { fireEvent, render } from '@testing-library/react';

import placeholders from '../text/placeholders';

describe('WriteFirstForm', () => {
  const fields = {
    sender: {
      id: 'sender',
      name: '보내는 사람',
      value: '',
      placeholder: placeholders['sender'],
      errorMessage: '',
      onChange: jest.fn(),
    },
    receiver:{
      id: 'receiver',
      name: '받는 사람',
      value: '',
      placeholder: placeholders['receiver'],
      errorMessage: '',
      onChange: jest.fn(),
    },
    secretMessage: {
      id: 'secretMessage',
      name: '비밀 메시지',
      value: '',
      placeholder: placeholders['secretMessage'],
      errorMessage: '',
      onChange: jest.fn(),
    },
  };

  const onClick = jest.fn();
  const handleRadioChange = jest.fn();

  const { getByLabelText, getAllByPlaceholderText, getByText } = render(
    <WriteFirstForm
      fields={fields}
      onHandleClick={onClick}
      onHandleRadioChange={handleRadioChange}
      isPrivate={true}
    />
  );

  it('render writeFirstFor', () => {
    Object.entries(fields).forEach(([_, {
      name,
      onChange,
    }]) => {
      expect(getByLabelText(name)).not.toBeNull();
      fireEvent.change(getByLabelText(name), {target: {value: 'test'} });
      expect(onChange).toBeCalled();
    });
    
    expect(getAllByPlaceholderText(placeholders['sender'])).toHaveLength(2);
    expect(getAllByPlaceholderText(placeholders['secretMessage'])).toHaveLength(1);

    expect(getByText('관리자에게 쓰고 싶은 편지가 있다면 받는 사람을 ‘관리자’로 입력해주세요.')).not.toBeNull();
    expect(getByText('엽서를 확인 또는 파기하기 위해 사용되며 받는 사람에게도 공유됩니다.')).not.toBeNull();

    expect(getByText('공개 여부')).not.toBeNull();
    expect(getByLabelText('비공개')).not.toBeNull();
    expect(getByLabelText('비공개')).toBeChecked();

    fireEvent.click(getByLabelText('공개'));
    expect(handleRadioChange).toBeCalled();
    
    expect('신중하게 선택해 주세요. 공개 시 다른 사람에게도 공개 되며 수정이 불가능 하며 공개하고 싶지 않다면 삭제 해야 합니다.')
    .not.toBeNull();

    expect(getByText('다음')).not.toBeNull();

    fireEvent.click(getByText('다음'));
    expect(onClick).toBeCalled();
  });
});
