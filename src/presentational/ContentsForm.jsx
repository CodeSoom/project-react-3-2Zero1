import React from 'react';

import styled from '@emotion/styled';

const Button = styled.button(() => ({
  fontSize: '16px',
  margin: '10px',
  padding: '5px 8px',
}));

const Title = styled.span(() => ({
  position: 'absolute',
  top: '10px',
  left: '50%',
  textAlign: 'center',
  fontSize: '20px',
  transform: 'translateX(-50%)',
}));

const CompleteButton = styled.button(() => ({
  position: 'absolute',
  right: '10px',
  top: '10px',
  padding: '5px 8px',
}));

const Error = styled.p(() => ({
  marginTop: '2px',
  fontSize: '12px',
  color: 'red',
  marginLeft: '20px',
}));

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
      <Button
        type="button"
        onClick={onClickPrevious}
      >
        이전
      </Button>
      <CompleteButton
        type="button"
        onClick={handleClick}
      >
        다음
      </CompleteButton>
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
