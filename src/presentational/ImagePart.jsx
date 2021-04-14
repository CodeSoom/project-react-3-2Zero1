import React, { useRef } from 'react';

import styled from '@emotion/styled';

import Information from '../style/Information';

const Photo = styled.img(() => ({
  display: 'block',
  width: '95%',
  height: '60%',
  margin: '0 auto 0 auto',
}));

const DefaultImage = styled.div(() => ({
  width: '90%',
  height: '60%',
  textAlign: 'center',
  margin: '10px auto 0',
  paddingTop: '50%',
  border: '1px solid #f9f9f9',
}));

const Error = styled.p(() => ({
  marginTop: '2px',
  fontSize: '12px',
  color: 'red',
  marginLeft: '20px',
}));

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
      <Information>세로로 된 사진을 사용하시는걸 권장합니다.</Information>
      {
        value ? (
          <Photo
            type="button"
            onClick={handleClick}
            src={value}
            alt="photoImage"
          />
        ) : (
          <DefaultImage
            type="button"
            onClick={handleClick}
          >
            이미지를 선택해 주세요
          </DefaultImage>
        )
      }
      {errorMessage ? <Error error={errorMessage}>{errorMessage}</Error> : null}
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
