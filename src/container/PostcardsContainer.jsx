import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PostcardItem from '../presentational/PostcardItem';

import { loadPostcards } from '../state/slice';

export default function PostcardsContainer({ handlePreviousClick }) {
  const dispatch = useDispatch();

  const { postcards } = useSelector((state) => ({
    postcards: state.postcards,
  }));

  useEffect(() => {
    dispatch(loadPostcards());
  }, []);

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
        {postcards.map((postcard) => (<PostcardItem key={postcard.rid} postcardItem={postcard} />))}
      </ul>
    </>
  );
}
