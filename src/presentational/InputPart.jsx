import React from 'react';

import styled from '@emotion/styled';

const InputText = styled.div(() => ({
  textAlign: 'center',
  margin: '13px 0 13px 0',
  fontSize: '18px',
}));

const Label = styled.label(() => ({
  marginRight: '10px',
  verticalAlign: 'middle',
  fontSize: '14px',
}));

const Error = styled.p(() => ({
  marginTop: '2px',
  fontSize: '8px',
  color: 'red',
}));

const Input = styled.input(({ error }) => ({
  border: `1px solid ${error ? 'red' : '#d8d8d8'}`,
  padding: '5px',
  verticalAlign: 'middle',
}));

export default function InputPart({
  field: {
    id,
    name,
    value,
    placeholder,
    errorMessage,
    onChange,
  },
}) {
  function handleChange(event) {
    const { target: { value: targetValue } } = event;
    onChange(targetValue);
  }
  return (
    <InputText>
      <Label htmlFor={id}>{name}</Label>
      <Input
        id={id}
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
        error={errorMessage}
      />
      {errorMessage ? <Error>{errorMessage}</Error> : null}
    </InputText>
  );
}
