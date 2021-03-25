import React from 'react'

export default function RadioButton({
  id,
  label,
  name,
  value,
  onChange,
  checked,
}) {

  return (
  <>
    <label htmlFor={id}>{label}</label>
    <input
      id={id}
      name={name}
      type="radio"
      value={value}
      onChange={onChange}
      checked={checked}
    />
  </>
  );
}
