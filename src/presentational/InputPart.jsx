import React from 'react';

import styled from '@emotion/styled';

const InputText = styled.div(() => ({
  textAlign: 'center',
  margin: '10px 0 10px 0',
  fontSize: '18px',
}));

const Label = styled.label(() => ({
  marginRight: '10px',
}));

const Error = styled.p(() => ({
  marginTop: '2px',
  fontSize: '12px',
  color: 'red',
}));

const Input = styled.input(({ error }) => ({
  borderColor: error ? 'red' : '',
  padding: '5px',
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
