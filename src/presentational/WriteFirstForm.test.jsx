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
      placeholder: placeholders['name'],
      errorMessage: '',
      onChange: jest.fn(),
    },
    receiver:{
      id: 'receiver',
      name: '받는 사람',
      value: '',
      placeholder: placeholders['name'],
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

  const { getByLabelText, getAllByPlaceholderText, getByText } = render(
    <WriteFirstForm
      fields={fields}
      onHandleClick={onClick}
    />
  );

  it('show sender and receiver and secretMessage inputs', () => {
    Object.entries(fields).forEach(([_, {
      name,
      onChange,
    }]) => {
      expect(getByLabelText(name)).not.toBeNull();
      fireEvent.change(getByLabelText(name), {target: {value: 'test'} });
      expect(onChange).toBeCalled();
    });
    
    expect(getAllByPlaceholderText(placeholders['name'])).toHaveLength(2);
    expect(getAllByPlaceholderText(placeholders['secretMessage'])).toHaveLength(1);

    expect(getByText('관리자에게 쓰고 싶은 편지가 있다면 받는 사람을 ‘관리자’로 입력해주세요.')).not.toBeNull();
    expect(getByText('엽서를 확인 또는 파기하기 위해 사용되며 받는 사람에게도 공유됩니다.')).not.toBeNull();

    expect(getByText('다음')).not.toBeNull();

    fireEvent.click(getByText('다음'));
    expect(onClick).toBeCalled();
  });
});
