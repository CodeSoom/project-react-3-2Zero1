import React from 'react';

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
      <button
        type="button"
        onClick={onClickPrevious}
      >
        이전
      </button>
      <div>내용 작성</div>
      <textarea
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
      />
      {errorMessage ? <div>{errorMessage}</div> : null}
      <button
        type="button"
        onClick={handleClick}
      >
        다음
      </button>
    </>
  );
}
