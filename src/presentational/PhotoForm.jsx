import React from 'react';

import styled from '@emotion/styled';

import ImagePart from './ImagePart';
import InputPart from './InputPart';

import {
  NextButton,
  PreviousButton,
} from '../style/commonCss';

const Title = styled.span(() => ({
  position: 'absolute',
  top: '10px',
  left: '50%',
  textAlign: 'center',
  fontSize: '20px',
  transform: 'translateX(-50%)',
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
      <PreviousButton
        type="button"
        onClick={handlePreviewClick}
      >
        이전
      </PreviousButton>
      <NextButton
        type="button"
        onClick={onHandleNextClick}
      >
        미리보기
      </NextButton>
      <Title>이미지 첨부</Title>
      <ImagePart
        photo={photo}
        onHandleChangeFile={onChangeFile}
      />
      <InputPart field={photoMessage} />
    </>
  );
}
