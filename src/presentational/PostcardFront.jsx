import React from 'react'

export default function PostcardFront({
  sender,
  receiver,
  contents,
  stampUrl
}) {

  return (
    <div>
        <div>{`to ${receiver}`}</div>
        <div>{`from ${sender}`}</div>
        <img
          src={stampUrl}
        />
        <div>{contents}</div>
      </div>
  );
}
