import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

import WriteSecondForm from '../presentational/WriteSecondForm';

import { get } from '../utils/utils';
import { getField } from '../utils/utils'
import validate from '../utils/validate';

import {
  setInputFieldsError,
} from '../state/slice';

export default function WriteSecondFormContainer({ onClickNext, onClickPrevious, getChangeHandler }) {

  const dispatch = useDispatch();
  const { 
    write: {
      photoMessage,
      photo,
    },
  } = useSelector(get('inputFields'));

  const fields = {
    photo: getField({
      field:photo,
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
    
    if(checks.filter(([_, check]) => !check).length === 0) {
      onClickNext();
    }
  };

  function handleFileChange(event) {
    const file = event.target.files[0];
    if(file){
      const imageUrl = URL.createObjectURL(file);
      const setImageFileName = getChangeHandler('photo');
      setImageFileName(imageUrl);
    }
  }

  return (
    <WriteSecondForm
      fields={fields}
      onClickPrevious={onClickPrevious}
      onChangeFile={handleFileChange}
      onHandleNextClick={handleNextClick}
    />
  );
}
