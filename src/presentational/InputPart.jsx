import React from 'react';

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
