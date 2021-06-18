import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import InformationForm from '../presentational/InformationForm';

import validate from '../utils/validate';
import { getField } from '../utils/utils';

import {
  setInputFieldsError,
  changeInputFieldValue,
} from '../state/commonSlice';

import {
  changeRadioChecked,
} from '../state/writeSlice';

export default function InformationFormContainer({
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

  const getChangeHandler = (page, type) => ((value) => {
    dispatch(changeInputFieldValue({
      page,
      type,
      value,
    }));
  });

  const {
    write: {
      sender,
      receiver,
      secretMessage,
      isPrivate,
    },
  } = inputFields;

  checkValidAccess(writePageIndex);

  const fields = {
    sender: getField({
      field: sender,
      id: 'sender',
      name: '보내는 사람',
      onChange: getChangeHandler('write', 'sender'),
    }),
    receiver: getField({
      field: receiver,
      id: 'receiver',
      name: '받는 사람',
      onChange: getChangeHandler('write', 'receiver'),
    }),
    secretMessage: getField({
      field: secretMessage,
      id: 'secretMessage',
      name: '엽서 암호',
      onChange: getChangeHandler('write', 'secretMessage'),
    }),
  };

  function handleRadioChange(event) {
    const { target: { value } } = event;
    dispatch(changeRadioChecked(value === 'true'));
  }

  function handleError([key, checked]) {
    dispatch(setInputFieldsError({
      page: 'write',
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
