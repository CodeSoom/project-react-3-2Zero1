import React, { useRef } from 'react';

export default function ImagePart({
  photo: {
    value,
    errorMessage,
  },
  onHandleChangeFile,
}) {
  const img = (isDefault = true) => ({
    display: 'inline-block',
    width: '200px',
    height: '350px',
    Background: isDefault ? 'gray' : '#ffffff',
  });

  const fileSelector = useRef(null);

  function handleClick() {
    fileSelector.current.click();
  }

  return (
    <>
      <div>세로로 된 사진을 사용하시는걸 권장합니다.</div>
      {
        value ? (
          <button
            type="button"
            onClick={handleClick}
          >
            <img src={value} alt="photoImage" />
          </button>
        ) : (
          <button
            type="button"
            onClick={handleClick}
          >
            이미지를 선택해 주세요
          </button>
        )
      }
      {errorMessage ? <div>{errorMessage}</div> : null}
      <input
        Style="display:none"
        ref={fileSelector}
        type="file"
        accept="image/*"
        onChange={onHandleChangeFile.bind(this)}
      />
    </>
  );
}
