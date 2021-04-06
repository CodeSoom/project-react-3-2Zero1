import React from 'react';

import styled from '@emotion/styled';

import ImagePart from './ImagePart';
import InputPart from './InputPart';

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
  fontSize: '16px',
}));

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
      <Button
        type="button"
        onClick={handlePreviewClick}
      >
        이전
      </Button>
      <CompleteButton
        type="button"
        onClick={onHandleNextClick}
      >
        미리보기
      </CompleteButton>
      <Title>이미지 첨부</Title>
      <ImagePart
        photo={photo}
        onHandleChangeFile={onChangeFile}
      />
      <InputPart field={photoMessage} />
    </>
  );
}
