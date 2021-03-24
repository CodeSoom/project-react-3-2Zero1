import React from 'react';
import { fireEvent, render } from '@testing-library/react';

import Input from './Input';

import inputFields from '../fixtures/inputFields';
import errorMessages from '../fixtures/errorMessages';
import placeholders from '../fixtures/placeholders';

describe('Input', () => {
  const handleChange = jest.fn();
  const { entrance: { secretMessage } } = inputFields;
  const id = 'secretMessage';

  function renderInput(id, name, value, placeholder, errorMessage) {
    return (
      render(
        <Input
          id={id}
          name={name}
          value={value}
          placeholder={placeholder}
          errorMessage={errorMessage}
          onChange={handleChange}
        />
      )
    );
  }

  context('without errorMessage', () => {
    it("doesn't show errorMessage", () => {
      const name = '비밀 메시지';
      const { value, error } = secretMessage;
      const type = 'secretMessage';
      const placeholder = placeholders[type];
      const errorMessage = errorMessages[type][error];
      const { getByPlaceholderText, getByLabelText } = renderInput(id , name, value, placeholder, errorMessage);

      expect(getByLabelText(name)).not.toBeNull();
      expect(getByPlaceholderText(secretMessage.placeholder)).not.toBeNull();
      

      fireEvent.change(getByPlaceholderText(secretMessage.placeholder), {
        target: { value: 'hello' },
      });

      expect(handleChange).toBeCalled();
    });
  });

  context('with errorMessage', () => {
    it("show errorMessage", () => {
      const name = '비밀 메시지';
      const value = '';
      const placeholder = placeholders['secretMessage'];
      const errorMessage = errorMessages['secretMessage']['default'];
      
      const { getByPlaceholderText, getByText, getByLabelText } = renderInput(id, name, value, placeholder, errorMessage);

      expect(getByLabelText(name)).not.toBeNull();
      expect(getByPlaceholderText(placeholder)).not.toBeNull();
      expect(getByText(errorMessage)).not.toBeNull();
    });
  });
});
