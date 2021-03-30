import React from 'react';

import ContentsForm from './ContentsForm';

import { fireEvent, render } from '@testing-library/react';
import { useSelector } from 'react-redux';

import inputFields from '../fixtures/inputFields'
import placeholders from '../text/placeholders';
import errorMessages from '../text/errorMessages';

describe('ContentsForm', () => {
  
  const onClick = jest.fn();
  const handlePreviousClick = jest.fn();
  const handleChange = jest.fn();

  useSelector.mockImplementation((selector) => selector({
    inputFields: inputFields,
  }));

  function renderContentsForm(isError=false) {
    const contents = {
      id: 'contents',
      value: '안녕하십니까 이것은 테스트를 위한 값입니다. 테스트 테스트 테스트 테스트',
      placeholder: placeholders['contents'],
      errorMessage: isError? errorMessages['contents'] : '',
      onChange: handleChange,
    };
    return render(
      <ContentsForm
        contents={contents}
        onHandleClick={onClick}
        onClickPrevious={handlePreviousClick}
      />
    );
  };

  it('render contentsForm', () => {
    const { getByPlaceholderText } = renderContentsForm();

    expect(getByPlaceholderText(placeholders['contents'])).not.toBeNull();
    fireEvent.change(getByPlaceholderText(placeholders['contents']), { target: { value: 'input' } });
    expect(handleChange).toBeCalled();
  });
  

  context('without error', () => {
    it("does not show errorMessage", () => {
      const { getByDisplayValue } = renderContentsForm();

      expect(getByDisplayValue('안녕하십니까 이것은 테스트를 위한 값입니다. 테스트 테스트 테스트 테스트')).not.toBeNull
    });
  });
  context('with error', () => {
    it("show errorMessage", () => {
      const { getByPlaceholderText, getByText } = renderContentsForm(true);
      
      expect(getByPlaceholderText(placeholders['contents'])).not.toBeNull();
      expect(getByText(errorMessages['contents'])).not.toBeNull();
    });
  });
});
