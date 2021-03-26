import React from 'react'

export default function ImagePart({
  photo: {
    value
  },
  onHandleChangeFile,
}) {
  const img = (isDefault = true) => ({
    display: 'inline-block',
    width: '200px',
    height: '350px',
    Background: isDefault ? 'gray' : '#ffffff',
  });

  const tmp = {};

  function onClick() {
    tmp.fileSelector.click();
  }

  return (
    <>
      <div>세로로 된 사진을 사용하시는걸 권장합니다.</div>
      {value ? (<img src={value} onClick={onClick}/>) : (
        <div onClick={onClick}>이미지를 선택해 주세요</div>
      )}
      <input Style="display:none" ref={(ref) => tmp.fileSelector=ref} type="file" accept="image/*" onChange={onHandleChangeFile.bind(this)}/>
    </>
  );
}
