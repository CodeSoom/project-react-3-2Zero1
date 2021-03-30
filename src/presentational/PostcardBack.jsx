import React from 'react'

export default function PostcardBack({
  photoMessage,
  photoUrl
}) {

  return (
    <div>
      <img src={photoUrl} />
      <div>{photoMessage}</div>
    </div>
  );
}
