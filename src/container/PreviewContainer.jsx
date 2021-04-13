import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { loadItem } from '../services/storage';

import {
  flipPreviewPostcard,
  sendPostcard,
} from '../state/slice';

import Postcard from '../presentational/Postcard';

export default function PreviewContainer({
  onClickNext,
  onClickPrevious,
  checkValidAccess,
}) {
  const dispatch = useDispatch();

  const key = loadItem('postcardKey');

  const { writePageIndex, inputFields } = useSelector((state) => (
    {
      writePageIndex: state.writePageIndex,
      inputFields: state.inputFields,
    }
  ));

  const {
    write: {
      sender,
      receiver,
      contents,
      preview,
      photoMessage,
      secretMessage,
      photo,
      isPrivate,
    },
  } = inputFields;

  checkValidAccess(writePageIndex);
  const postcard = {
    key, // TODO : 입장 페이지가 완료되면 key값을 받아 넣어주도록 변경해야함.
    sender: sender.value,
    receiver: receiver.value,
    contents: contents.value,
    photoUrl: photo.value,
    stampUrl: photo.value,
    photoMessage: photoMessage.value,
    secretMessage: secretMessage.value,
    isPrivate: isPrivate,
  };

  const showCompleteButton = true;

  function handleClickPage(e) {
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
        onHandleClickPage={handleClickPage}
        onHandlePrivousClick={onClickPrevious}
        showCompleteButton={showCompleteButton}
        onHandleCompleteClick={handleCompleteClick}
      />
    </>
  );
}
