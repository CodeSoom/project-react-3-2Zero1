import React from 'react';

import WriteSecondForm from './WriteSecondForm';

import { fireEvent, render } from '@testing-library/react';

import placeholders from '../text/placeholders';

describe('WriteSecondForm', () => {
  const handleClick =  jest.fn();
  const handlePreviousClick = jest.fn();
  const fields = {
    photo: {
      value: '',
      errorMessage: '',
      onChange: jest.fn(),
    },
    photoMessage:{
      id: 'photoMessage',
      name: '사진 메시지',
      value: '',
      placeholder: placeholders['photoMessage'],
      errorMessage: '',
      onChange: jest.fn(),
    }
  };

  const { getByLabelText, getAllByPlaceholderText, getByText } = render(
    <WriteSecondForm
      fields={fields}
      onHandleClick={handleClick}
      onClickPrevious={handlePreviousClick}
    />
  );

  it('render WriteSecondForm', () => {
    fireEvent.click(getByText('이전'));
    expect(handlePreviousClick).toBeCalled();

    expect(getByText('이미지 첨부')).not.toBeNull();
    expect(getByText('세로로 된 사진을 사용하시는걸 권장합니다.')).not.toBeNull();
    expect(getByLabelText('사진 메시지')).not.toBeNull();
    expect(getByLabelText('사진 메시지').placeholder).toBe('10 ~ 20자');

    expect(getByText('미리보기')).not.toBeNull();
  });
});
