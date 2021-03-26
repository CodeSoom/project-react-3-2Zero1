import React from 'react'
import InputPart from './InputPart'
import RadioPart from './RadioPart'

export default function WriteFirstForm({
  fields: {
    photo,
    photoMessage,
  },
  onHandleClick,
  onClickPrevious
}) {

  console.log(photoMessage);
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
    <div>세로로 된 사진을 사용하시는걸 권장합니다.</div>
    <InputPart field={photoMessage} />
    <button
      type="button"
      
    >
      미리보기
    </button>
  </>
  );
}
