import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { loadItem } from '../services/storage';

import {
  flipPreviewPostcard,
  sendPostcard,
} from '../state/writeSlice';

import Postcard from '../presentational/Postcard';

export default function PreviewContainer({
  onClickNext,
  onClickPrevious,
  checkValidAccess,
}) {
  const dispatch = useDispatch();

  const key = loadItem('postcardKey');

  const { write } = useSelector((state) => ({ write: state.write }));

  const {
    writePageIndex,
    inputFields,
  } = write;

  const {
    sender,
    receiver,
    contents,
    preview,
    photoMessage,
    secretMessage,
    photo,
    isPrivate,
  } = inputFields;

  checkValidAccess(writePageIndex);
  const postcard = {
    key,
    sender: sender.value,
    receiver: receiver.value,
    contents: contents.value,
    photoUrl: photo.value,
    stampUrl: photo.value,
    photoMessage: photoMessage.value,
    secretMessage: secretMessage.value,
    isPrivate,
  };

  const showCompleteButton = true;

  function handleClickFlip(e) {
    e.stopPropagation();
    dispatch(flipPreviewPostcard());
  }

  function handleCompleteClick(e) {
    e.stopPropagation();
    dispatch(sendPostcard({ postcardValues: postcard, onClickNext }));
  }
  return (
    <>
      <Postcard
        postcard={postcard}
        isFrontPage={preview.isFrontPage}
        onHandleClickFlip={handleClickFlip}
        onHandlePreviousClick={onClickPrevious}
        showCompleteButton={showCompleteButton}
        onHandleCompleteClick={handleCompleteClick}
      />
    </>
  );
}
