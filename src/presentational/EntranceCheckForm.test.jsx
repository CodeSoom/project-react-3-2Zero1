import React from 'react';

import { useSelector } from 'react-redux';

import { fireEvent, render } from '@testing-library/react';

import EntranceCheckForm from './EntranceCheckForm';

import inputFields from '../fixtures/inputFields';
import placeholders from '../text/placeholders';

describe('EntranceCheckForm', () => {
  useSelector.mockImplementation((selector) => selector({
    inputFields,
  }));

  const onClick = jest.fn();
  const onChange = jest.fn();

  const value = '';
  const placeholder = placeholders.secretMessage;
  const errorMessage = '';

  function renderEntranceCheckForm(isPrivate) {
    const field = {
      value,
      placeholder,
      errorMessage,
    };

    return render((
      <EntranceCheckForm
        isPrivate={isPrivate}
        onClick={onClick}
        onChange={onChange}
        field={field}
      />
    ));
  }

  context('postcard is private', () => {
    it('shows secret message input and information message', () => {
      const { getByText, getByPlaceholderText } = renderEntranceCheckForm(true);

      expect(getByPlaceholderText('5 ~ 20자')).not.toBeNull();
      expect(getByText('비공개 엽서입니다. 문자로 받은 비밀 메시지를 입력 후 엽서 확인하기 버튼을 눌러주세요.')).not.toBeNull();
    });
  });

  context('postcard is not private', () => {
    it("doesn't show secret message input and information message", () => {
      const { queryByText, queryByPlaceholderText } = renderEntranceCheckForm(false);

      expect(queryByPlaceholderText('5 ~ 20자')).toBeNull();
      expect(queryByText('비공개 엽서입니다. 문자로 받은 비밀 메시지를 입력 후 엽서 확인하기 버튼을 눌러주세요.')).toBeNull();
    });
  });

  it('shows check postcard button', () => {
    const { getByText } = renderEntranceCheckForm(false);

    expect(getByText('엽서 확인하기')).not.toBeNull();

    fireEvent.click(getByText('엽서 확인하기'));
    expect(onClick).toBeCalled();
  });
});
