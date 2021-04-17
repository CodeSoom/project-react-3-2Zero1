import React from 'react';
import { useSelector } from 'react-redux';
import PostcardItem from '../presentational/PostcardItem';

export default function PostcardsContainer({ handlePreviousClick }) {
  const { postcards } = useSelector((state) => ({
    postcards: state.postcards,
  }));

  return (
    <>
      <button
        type="button"
        onClick={handlePreviousClick}
      >
        이전
      </button>
      <div>엽서 모음</div>
      <ul>
        {postcards.map((postcard) => (<PostcardItem postcardItem={postcard} />))}
      </ul>
    </>
  );
}
