import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

import PhotoForm from '../presentational/PhotoForm';

import { get } from '../utils/utils';
import { getField } from '../utils/utils'

import errorMessages from '../text/errorMessages';
import placeholders from '../text/placeholders';

import {
  flipPreviewPostcard,
} from '../state/slice';
import Postcard from '../presentational/Postcard';

export default function PreviewContainer({ onClickNext, onClickPrevious }) {

  const dispatch = useDispatch();
  const { 
    write: {
      sender,
      receiver,
      contents,
      preview,
      photoMessage,
      photo,
    },
  } = useSelector(get('inputFields'));

  const postcard = {
    isFrontPage: preview.isFrontPage,
    sender: sender.value,
    receiver: receiver.value,
    contents: contents.value,
    stampUrl: photo.value,
    photoUrl: photo.value,
    photoMessage: photoMessage.value,
  };

  console.log(postcard);

  function handleClickPage(e) {
    e.stopPropagation();
    dispatch(flipPreviewPostcard());
  }

  return (
    <>
      <div>미리 보기</div>
      <Postcard
        postcard={postcard}
        onHandleClickPage={handleClickPage}
        onHandlePrivousClick={onClickPrevious}
        showCompleteButton={true}
        onHandleCompleteClick={onClickNext}
      />
    </>
  );
}
