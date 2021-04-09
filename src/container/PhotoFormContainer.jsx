import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import PhotoForm from '../presentational/PhotoForm';

import { getField } from '../utils/utils';
import validate from '../utils/validate';

import {
  setInputFieldsError,
  sendPhoto,
} from '../state/slice';

export default function PhotoFormContainer({
  onClickNext,
  onClickPrevious,
  getChangeHandler,
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

  function handleNextClick() {
    const checks = validate(fields);

    checks.forEach(([key, checked]) => {
      dispatch(setInputFieldsError({
        page: 'write',
        type: key,
        error: !checked,
      }));
    });

    if (checks.filter(([, check]) => !check).length === 0) {
      onClickNext();
    }
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
