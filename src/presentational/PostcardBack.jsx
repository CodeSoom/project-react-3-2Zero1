import React from 'react';

import styled from '@emotion/styled';

const CompleteButton = styled.button(() => ({
  position: 'absolute',
  right: '10px',
  top: '10px',
  fontSize: '16px',
  padding: '5px 8px',
}));

const Photo = styled.img(() => ({
  display: 'block',
  width: '95%',
  height: '90%',
  margin: '0 auto 0 auto',
}));

const Text = styled.div(() => ({
  textAlign: 'center',
  marginTop: '10px',
}));

export default function PostcardBack({
  photoMessage,
  photoUrl,
  showCompleteButton,
  onHandleCompleteClick,
}) {
  return (
    <div>
      {
        showCompleteButton ? (
          <CompleteButton
            type="button"
            onClick={onHandleCompleteClick}
          >
            완료
          </CompleteButton>
        ) : null
      }
      <Photo src={photoUrl} alt="photoImage" />
      <Text>{photoMessage}</Text>
    </div>
  );
}
