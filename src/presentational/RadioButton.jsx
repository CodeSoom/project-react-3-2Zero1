import React from 'react';

import styled from '@emotion/styled';

const Wrapper = styled.div(() => ({
  display: 'inline-block',
  margin: '0 5px',
}));

export default function RadioButton({
  id,
  label,
  name,
  value,
  onChange,
  checked,
}) {
  return (
    <Wrapper>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        name={name}
        type="radio"
        value={value}
        onChange={onChange}
        checked={checked}
      />
    </Wrapper>
  );
}
