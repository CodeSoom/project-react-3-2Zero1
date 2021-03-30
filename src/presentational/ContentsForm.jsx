import React from 'react'
import InputPart from './InputPart'

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
    const { target: { value } } = event;
    onChange(value);
  }

  function handleClick(value) {
    onHandleClick(value);
  }

  return (
  <>
    <button
      onClick={onClickPrevious}
    >
      이전
    </button>
    <div>내용 작성</div>
    <textarea
      value={value}
      placeholder={placeholder}
      onChange={handleChange}
    ></textarea>
    {errorMessage ? <div>{errorMessage}</div> : null}
    <button
      onClick={handleClick}
    >
      다음
    </button>
  </>
  );
}
