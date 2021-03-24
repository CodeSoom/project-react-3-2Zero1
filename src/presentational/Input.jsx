import styled from '@emotion/styled';
import React from 'react'

export default function Input({
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
    const { target: { value } } = event;
    onChange(value);
  }

  const Input = styled.input({
    borderColor: errorMessage ? '#FF0000' : '#d2d2d2', 
  });

  return (
    <>
      <label htmlFor={id}>{name}</label>
      <Input
        id={id}
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
      />
      {errorMessage ? <div>{errorMessage}</div> : null}
    </>
  );
}
