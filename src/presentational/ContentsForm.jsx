import React from 'react';

import styled from '@emotion/styled';
import { Error, NextButton, PreviousButton } from '../style/commonCss';

const Title = styled.span(() => (
  {
    position: 'absolute',
    left: '50%',
    textAlign: 'center',
    fontSize: '20px',
    transform: 'translateX(-50%)',
  }
));

const Contents = styled.textarea(({ error }) => ({
  display: 'block',
  width: '90%',
  height: '80%',
  margin: '10px auto',
  padding: '10px',
  fontSize: '20px',
  borderColor: error ? 'red' : '',
}));

export default function ContentsForm({
  contents: {
    value,
    placeholder,
    errorMessage,
    onChange,
  },
  onHandleClick,
  onClickPrevious,
}) {
  function handleChange(event) {
    const { target: { value: targetValue } } = event;
    onChange(targetValue);
  }

  function handleClick(v) {
    onHandleClick(v);
  }

  return (
    <>
      <Title>내용 작성</Title>
      <PreviousButton
        type="button"
        onClick={onClickPrevious}
      >
        이전
      </PreviousButton>
      <NextButton
        type="button"
        onClick={handleClick}
      >
        다음
      </NextButton>
      <Contents
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
        error={errorMessage}
      />
      {errorMessage ? <Error>{errorMessage}</Error> : null}
    </>
  );
}
