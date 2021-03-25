import styled from '@emotion/styled';
import React from 'react'

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
  const Input = styled.input({
    borderColor: errorMessage ? '#FF0000' : '#d2d2d2', 
  });

  function handleChange(event) {
    const { target: { value } } = event;
    onChange(value);
  }

  return (
    <>
      <label htmlFor={id}>{name}</label>
      <input
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
