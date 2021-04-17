import React from 'react';

export default function PostcardItem({
  postcardItem: {
    receiver,
    photo,
    photoMessage,
  },
}) {
  return (
    <li>
      <div>{`${receiver}님이 받은 엽서`}</div>
      <img src={photo} alt="postcardImage" />
      <div>{photoMessage}</div>
    </li>
  );
}
