import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import PhotoForm from '../presentational/PhotoForm';

import { getField } from '../utils/utils';
import validate from '../utils/validate';

import {
  sendPhoto,
  setInputFieldsError,
  changeInputFieldValue,
} from '../state/writeSlice';

export default function PhotoFormContainer({
  onClickNext,
  onClickPrevious,
  checkValidAccess,
}) {
  const dispatch = useDispatch();

  const { write } = useSelector((state) => ({ write: state.write }));

  const {
    writePageIndex,
    inputFields,
  } = write;

  const {
    photo,
    photoMessage,
  } = inputFields;

  checkValidAccess(writePageIndex);

  const getChangeHandler = (type) => ((value) => {
    dispatch(changeInputFieldValue({
      type,
      value,
    }));
  });

  const fields = {
    photo: getField({
      field: photo,
      id: 'photo',
    }),
    photoMessage: getField({
      field: photoMessage,
      id: 'photoMessage',
      name: '사진 메시지',
      onChange: getChangeHandler('photoMessage'),
    }),
  };

  function handleError([key, checked]) {
    dispatch(setInputFieldsError({
      type: key,
      error: !checked,
    }));
  }

  function handleNextClick() {
    validate(fields, handleError, onClickNext);
  }

  function handleFileChange(event) {
    const file = event.target.files[0];
    if (file) {
      dispatch(sendPhoto({ file }));
    }
  }

  return ((
    <PhotoForm
      fields={fields}
      onClickPrevious={onClickPrevious}
      onChangeFile={handleFileChange}
      onHandleNextClick={handleNextClick}
    />
  ));
}
