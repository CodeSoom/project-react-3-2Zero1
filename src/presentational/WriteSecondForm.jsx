import React from 'react'
import ImagePart from './ImagePart';
import InputPart from './InputPart'

export default function WriteSecondForm({
  fields: {
    photo,
    photoMessage,
  },
  onClickPrevious,
  onChangeFile,
  onHandleClick,
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
      
    >
      미리보기
    </button>
  </>
  );
}
