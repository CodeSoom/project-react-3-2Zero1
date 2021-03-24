import React from 'react'

import WriteFirstForm from '../presentational/WriteFirstForm';

import placeholders from '../text/placeholders';
import errorMessages from '../text/errorMessages';
import { useDispatch, useSelector } from 'react-redux';
import inputFields from '../fixtures/inputFields';

import {
  changeInputFieldValue,
} from '../state/slice';

const getField = ({ id, error, name, value, onChange, placeholder }) => ({
  id,
  name,
  value,
  placeholder,
  errorMessage: errorMessages[error],
  onChange,
});

export default function WriteFirstFormContainer() {

  const dispatch = useDispatch();
  
  const { inputFields: {
    write: {
      sender,
      receiver,
      secretMessage,
    }
    }} = useSelector((state) => ({
      inputFields: state.inputFields
    }));
  const fields = {
    sender: getField({
      ...sender,
      id: 'sender',
      name: '보내는 사람',
      placeholder: placeholders['name'],
      onChange: (value) => {
        dispatch(changeInputFieldValue({
          page: 'write',
          type: 'sender',
          value,
        }));
      },
    }),
    receiver: getField({
      ...receiver,
      id: 'receiver',
      name: '받는 사람',
      placeholder: placeholders['name'],
      onChange: (value) => {
        dispatch(changeInputFieldValue({
          page: 'write',
          type: 'receiver',
          value,
        }));
      },
    }),
    secretMessage: getField({
      ...secretMessage,
      id: 'secretMessage',
      placeholder: placeholders['secretMessage'],
      name: '비밀 메시지',
      onChange: (value) => {
        dispatch(changeInputFieldValue({
          page: 'write',
          type: 'secretMessage',
          value,
        }));
      },
    }),
  }

  function handleClick() {
    // 폼 vali 확인
    // 성공시 화면의 index+1 해주고 history를 second로 전진.
  }

  return (
    <>
      <WriteFirstForm
        onHandleClick={handleClick}
        fields={fields}
      />
    </>
  );
}
