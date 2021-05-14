import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import PhotoForm from '../presentational/PhotoForm';

import { getField } from '../utils/utils';
import validator from '../utils/validator';

import {
  setInputFieldsError,
  sendPhoto,
  changeInputFieldValue,
} from '../state/slice';

export default function PhotoFormContainer({
  onClickNext,
  onClickPrevious,
  checkValidAccess,
}) {
  const dispatch = useDispatch();

  const {
    writePageIndex,
    inputFields,
  } = useSelector((state) => (
    {
      writePageIndex: state.writePageIndex,
      inputFields: state.inputFields,
    }
  ));

  const {
    write: {
      photo,
      photoMessage,
    },
  } = inputFields;

  checkValidAccess(writePageIndex);

  const getChangeHandler = (page, type) => ((value) => {
    dispatch(changeInputFieldValue({
      page,
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
      onChange: getChangeHandler('write', 'photoMessage'),
    }),
  };

  function handleError([key, checked]) {
    dispatch(setInputFieldsError({
      page: 'write',
      type: key,
      error: !checked,
    }));
  }

  function handleNextClick() {
    validator(fields, handleError, onClickNext);
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
