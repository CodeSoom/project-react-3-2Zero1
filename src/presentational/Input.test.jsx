import React from 'react';
import { fireEvent, render } from '@testing-library/react';

import Input from './Input';

import inputFields from '../fixtures/inputFields';
import errorMessages from '../text/errorMessages';
import placeholders from '../text/placeholders';

describe('Input', () => {
  const onChange = jest.fn();
  const id = 'secretMessage';

  function renderInput(id, name, value, placeholder, errorMessage) {
    const field = {
      id,
      name,
      value,
      placeholder,
      errorMessage,
      onChange,
    };
    return (
      render(<Input field={field} /> )
    );
  }

  context('without errorMessage', () => {
    it("doesn't show errorMessage", () => {
      const name = '비밀 메시지';
      const value = 'hello';
      const type = 'secretMessage';
      const placeholder = placeholders[type];
      const errorMessage = '';
      const { getByPlaceholderText, getByLabelText } = renderInput(id , name, value, placeholder, errorMessage);

      expect(getByLabelText(name)).not.toBeNull();
      expect(getByPlaceholderText(placeholder)).not.toBeNull();
      

      fireEvent.change(getByPlaceholderText(placeholder), {
        target: { value: 'Hello' },
      });

      expect(onChange).toBeCalled();
    });
  });

  context('with errorMessage', () => {
    it("show errorMessage", () => {
      const name = '비밀 메시지';
      const value = '';
      const type = 'secretMessage';

      const placeholder = placeholders[type];
      const errorMessage = errorMessages[type]['default'];
      
      const { getByPlaceholderText, getByText, getByLabelText } = renderInput(id, name, value, placeholder, errorMessage);

      expect(getByLabelText(name)).not.toBeNull();
      expect(getByPlaceholderText(placeholder)).not.toBeNull();
      expect(getByText(errorMessage)).not.toBeNull();
    });
  });
});
