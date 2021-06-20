import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import validate from '../utils/validate';
import { getField } from '../utils/utils';

import ContentsForm from '../presentational/ContentsForm';

import {
  changeInputFieldValue,
  setInputFieldsError,
} from '../state/writeSlice';

export default function ContentsFormContainer({
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

  const getChangeHandler = (type) => ((value) => {
    dispatch(changeInputFieldValue({

      type,
      value,
    }));
  });

  const { contents } = inputFields;

  checkValidAccess(writePageIndex);

  const fields = {
    contents: getField({
      field: contents,
      id: 'contents',
      onChange: getChangeHandler('contents'),
    }),
  };

  function handleError([key, checked]) {
    dispatch(setInputFieldsError({
      type: key,
      error: !checked,
    }));
  }

  function handleClick() {
    validate(fields, handleError, onClickNext);
  }

  return ((
    <ContentsForm
      contents={fields.contents}
      onHandleClick={handleClick}
      onClickPrevious={onClickPrevious}
    />
  ));
}
