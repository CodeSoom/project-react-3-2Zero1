import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

import WriteSecondForm from '../presentational/WriteSecondForm';

import { get, getField } from '../utils/utils';

import errorMessages from '../text/errorMessages';
import placeholders from '../text/placeholders';

export default function WriteSecondFormContainer({ onClickNext, onClickPrevious, getChangeHandler }) {
  const { 
    write: {
      photoMessage,
      photo,
    },
  } = useSelector(get('inputFields'));

  const fields = {
    photo: {
      ...photo,
      errorMessage: photo.error ? errorMessages['photo'] : '',
    },
    photoMessage: {
      field: photoMessage,
      id: 'photoMessage',
      name: '사진 메시지',
      placeholder: placeholders['photoMessage'],
      onChange: getChangeHandler('photoMessage'),
    },
  };
  
  function handlePreviewClick() {
    onClickNext();
  };

  return (
    <WriteSecondForm
      fields={fields}
      onClickPrevious={onClickPrevious}
      onHandleClick={handlePreviewClick}
    />
  );
}
