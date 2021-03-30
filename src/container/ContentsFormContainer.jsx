import React from 'react'

import InformationForm from '../presentational/InformationForm';

import placeholders from '../text/placeholders';
import errorMessages from '../text/errorMessages';
import { useDispatch, useSelector } from 'react-redux';
import validator from '../utils/validate';
import { getField } from '../utils/utils'

import {
  changeInputFieldValue,
  changeRadioChecked,
  setInputFieldsError,
} from '../state/slice';
import ContentsForm from '../presentational/ContentsForm';

export default function ContentsFormContainer({ onClickNext, onClickPrevious, getChangeHandler }) {

  const dispatch = useDispatch();

  const { inputFields: {
    write: {
      contents,
    },
    }} = useSelector((state) => ({
      inputFields: state.inputFields
    }));

  const fields = {
    contents: getField({
      field: contents,
      id: 'contents',
      onChange: getChangeHandler('contents'),
    }),
  };

  function handleClick() {
    const checks = validator(fields);

    checks.forEach(([key, checked]) => {
      dispatch(setInputFieldsError({
        page: 'write',
        type: key,
        error: !checked,
      }));
    });
    
    if(checks.filter(([_, check]) => !check).length === 0) {
      onClickNext();
    }
  }

  return (
    <>
    <ContentsForm
      contents={fields.contents}
      onHandleClick={handleClick}
      onClickPrevious={onClickPrevious}
    />
      {/* <button
        onClick={onClickPrevious}
      >
        이전
      </button>
      <div>내용 작성</div>
      <textarea
        placeholder={placeholders['contents']}
      ></textarea>
      <button
        onClick={handleClick}
      >
        다음
      </button> */}
    </>
  );
}
