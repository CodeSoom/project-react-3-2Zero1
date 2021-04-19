import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styled from '@emotion/styled';

import PostcardItem from '../presentational/PostcardItem';

import { loadPostcards } from '../state/slice';

import {
  PreviousButton,
  DefaultLayout,
} from '../style/commonCss';

const Title = styled.span(() => ({
  position: 'absolute',
  top: '10px',
  left: '50%',
  textAlign: 'center',
  fontSize: '20px',
  transform: 'translateX(-50%)',
}));

const List = styled.ul({
  height: '93%',
  overflow: 'scroll',
  textAlign: 'center',
});

export default function PostcardsContainer({ handlePreviousClick }) {
  const dispatch = useDispatch();

  const { postcards } = useSelector((state) => ({
    postcards: state.postcards,
  }));

  useEffect(() => {
    dispatch(loadPostcards());
  }, []);

  return (
    <DefaultLayout>
      <PreviousButton
        type="button"
        onClick={handlePreviousClick}
      >
        이전
      </PreviousButton>
      <Title>엽서 모음</Title>
      <List>
        {postcards.map((postcard) => (<PostcardItem key={postcard.rid} postcardItem={postcard} />))}
      </List>
    </DefaultLayout>
  );
}
