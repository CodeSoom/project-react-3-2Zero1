import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  flipPreviewPostcard,
} from '../state/slice';

import Postcard from '../presentational/Postcard';

export default function PreviewContainer({
  onClickNext,
  onClickPrevious,
  checkValidAccess,
}) {
  const dispatch = useDispatch();

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
      photo,
    },
  } = inputFields;

  checkValidAccess(writePageIndex);

  const postcard = {
    sender: sender.value,
    receiver: receiver.value,
    contents: contents.value,
    stampUrl: photo.value,
    photoUrl: photo.value,
    photoMessage: photoMessage.value,
  };

  const showCompleteButton = true;

  function handleClickPage(e) {
    e.stopPropagation();
    dispatch(flipPreviewPostcard());
  }

  function handleCompleteClick(e) {
    e.stopPropagation();
    // TODO: 서버로 등록하는 요청을 보내며, 응답이 왔을 때 onClickNext를 부른다.
    onClickNext();
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
