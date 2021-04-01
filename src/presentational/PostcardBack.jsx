import React from 'react';

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
          <button
            type="button"
            onClick={onHandleCompleteClick}
          >
            완료
          </button>
        ) : null
      }
      <img src={photoUrl} alt="photoImage" />
      <div>{photoMessage}</div>
    </div>
  );
}
