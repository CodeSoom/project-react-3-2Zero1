import React, { useRef } from 'react';

export default function ImagePart({
  photo: {
    value,
    errorMessage,
  },
  onHandleChangeFile,
}) {

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
      <label Style="display:none" htmlFor="fileSelector">파일 선택자</label>
      <input
        id="fileSelector"
        Style="display:none"
        ref={fileSelector}
        type="file"
        accept="image/*"
        onChange={onHandleChangeFile.bind(this)}
      />
    </>
  );
}
