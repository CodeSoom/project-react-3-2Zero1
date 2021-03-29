import React from 'react'
import { useSelector } from 'react-redux';

export default function PostcardPage() {

  const { postcard: {
    isFront,
    receiver,
    sender,
    contents,
  } } = useSelector((state) => ({
    postcard: state.postcard,
  }));

  return (
  <>
    <div>{`to ${receiver}`}</div>
    <div>{`from ${sender}`}</div>
    <div>{contents}</div>
  </>
  );
}
