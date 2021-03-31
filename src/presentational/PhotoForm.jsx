import React from 'react';
import ImagePart from './ImagePart';
import InputPart from './InputPart';

export default function PhotoForm({
  fields: {
    photo,
    photoMessage,
  },
  onClickPrevious,
  onChangeFile,
  onHandleNextClick,
}) {
  function handlePreviewClick() {
    onClickPrevious();
  }

  return (
    <>
      <button
        type="button"
        onClick={handlePreviewClick}
      >
        이전
      </button>
      <div>이미지 첨부</div>
      <ImagePart
        photo={photo}
        onHandleChangeFile={onChangeFile}
      />
      <InputPart field={photoMessage} />
      <button
        type="button"
        onClick={onHandleNextClick}
      >
        미리보기
      </button>
    </>
  );
}
