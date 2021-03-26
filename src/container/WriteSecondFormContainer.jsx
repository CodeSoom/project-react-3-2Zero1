import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

import InputPart from '../presentational/InputPart';


import { get, getField } from '../utils/utils';
// import WriteSecondFormForm from '../presentational/WriteSecondFormForm';


import {
  setInputFieldsError,
  changeInputFieldValue,
} from '../state/slice';
import errorMessages from '../text/errorMessages';


export default function WriteSecondFormContainer({ onClickNext, onClickPrevious, getChangeHandler }) {
  const { 
    write: {
      photoMessage,
      photo,
    },
  } = useSelector(get('inputFields'));

  const dispatch = useDispatch();

  const photoMsg = getField({
    field: photoMessage,
    id: 'photoMessage',
    name: '사진 메시지',
    onChange: getChangeHandler('photoMessage'),
  });

  const photo1 = {
    ...photo,
    errorMessage: photo.error ? errorMessages['photo'] : '',
  };

  
  
  function handlePreviewClick() {
    onClickPrevious();
  }
  
  return (
    <>
      <button
        type="button"
        onClick={handlePreviewClick}
      >
        이전
      </button>
      <div>이미지 첨부</div>
      <div>세로로 된 사진을 사용하시는걸 권장합니다.</div>
      <InputPart field={photoMsg} />
      <button
        type="button"
        onClick={handlePreviewClick}
      >미리보기</button>
    </>
  );
}
