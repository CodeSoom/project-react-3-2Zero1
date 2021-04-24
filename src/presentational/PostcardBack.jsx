import React from 'react';

import styled from '@emotion/styled';

import { Text, NextButton } from '../style/commonCss';

const Photo = styled.img(() => ({
  display: 'block',
  width: '95%',
  height: '90%',
  margin: '0 auto 0 auto',
}));

export default function PostcardBack({
  photoMessage,
  photoUrl,
  showCompleteButton,
  onHandleCompleteClick,
  onHandleClickGoToFront,
}) {
  return (
    <div>
      <button
        type="button"
        onClick={onHandleClickGoToFront}
      >
        앞면
      </button>
      {
        showCompleteButton ? (
          <NextButton
            type="button"
            onClick={onHandleCompleteClick}
          >
            완료
          </NextButton>
        ) : null
      }
      <Photo src={photoUrl} alt="photoImage" />
      <Text>{photoMessage}</Text>
    </div>
  );
}
