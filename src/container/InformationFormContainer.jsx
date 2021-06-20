import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import InformationForm from '../presentational/InformationForm';

import validate from '../utils/validate';
import { getField } from '../utils/utils';

import {
  setInputFieldsError,
  changeInputFieldValue,
  changeRadioChecked,
} from '../state/writeSlice';

export default function InformationFormContainer({
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

  const {
    sender,
    receiver,
    secretMessage,
    isPrivate,
  } = inputFields;

  checkValidAccess(writePageIndex);

  const fields = {
    sender: getField({
      field: sender,
      id: 'sender',
      name: '보내는 사람',
      onChange: getChangeHandler('sender'),
    }),
    receiver: getField({
      field: receiver,
      id: 'receiver',
      name: '받는 사람',
      onChange: getChangeHandler('receiver'),
    }),
    secretMessage: getField({
      field: secretMessage,
      id: 'secretMessage',
      name: '엽서 암호',
      onChange: getChangeHandler('secretMessage'),
    }),
  };

  function handleRadioChange(event) {
    const { target: { value } } = event;
    dispatch(changeRadioChecked(value === 'true'));
  }

  function handleError([key, checked]) {
    dispatch(setInputFieldsError({
      type: key,
      error: !checked,
    }));
  }

  function handleClick() {
    validate(fields, handleError, onClickNext);
  }

  return (
    <>
      <InformationForm
        onHandleClick={handleClick}
        fields={fields}
        isPrivate={isPrivate}
        onRadioChange={handleRadioChange}
        onClickPrevious={onClickPrevious}
      />
    </>
  );
}
