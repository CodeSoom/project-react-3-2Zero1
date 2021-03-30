import React from 'react'

export default function PostcardBack({
  photoMessage,
  photoUrl,
  showCompleteButton,
  onHandleCompleteClick,
}) {

  return (
    <div>
      {showCompleteButton ? (
      <div
        onClick={onHandleCompleteClick}
      >
        완료
      </div>
      ) : null}
      <img src={photoUrl} />
      <div>{photoMessage}</div>
    </div>
  );
}
