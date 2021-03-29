import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import EntranceCheckForm from '../presentational/EntranceCheckForm';
import EntranceWritePostcard from '../presentational/EntranceWritePostcard';

import placeholders from '../text/placeholders';
import errorMessages from '../text/errorMessages';

import {
  changeInputFieldValue,
  setInputFieldsError,
  loadPostcard,
} from '../state/slice';

export default function EntranceContainer({
  onHandleClickPostcard,
}) {
  const dispatch = useDispatch();

  const { entrance, inputFields } = useSelector((state) => ({
    entrance: state.entrance,
    inputFields: state.inputFields
  }));

  const { sender, postcardCount, writtenCount, isPrivate } = entrance;
  
  const { entrance: { secretMessage } } = inputFields;

  const { value, error } = secretMessage;

  const placeholder = placeholders['secretMessage'];

  const errorMessage = errorMessages['secretMessage'][error];

  function handleCheckPostcardClick(secretMessage) {
    if(isPrivate) {
      if(secretMessage.length < 5 || secretMessage.length > 21) {
        dispatch(setInputFieldsError({
          type: 'secretMessage',
          error: 'default',
        }));
        return;
      }
    }
    //서버 요청한 후에 private 이라면 key 값과 input값을 보내고 true false를 받는다. 실패했다면 에러 처리
    // dispatch(loadPostcard());
    onHandleClickPostcard();

  }

  function handleChange(value) {
    dispatch(changeInputFieldValue({
      type: 'secretMessage',
      value,
    }));
  }
  const field = {
    value,
    placeholder,
    errorMessage
  };
  return (
  <>
    <div>{`${sender}님으로 부터 엽서가 도착했어요.`}</div>
    <EntranceCheckForm
      isPrivate={isPrivate}
      field={field}
      onClick={handleCheckPostcardClick}
      onChange={handleChange}
    />
    <EntranceWritePostcard
      sender={sender}
      postcardCount={postcardCount}
    />
    <div>{`현재 까지 ${writtenCount}명의 엽서가 작성 되었습니다.`}</div>
    <button type="button">다른 사람 엽서 보러가기</button>
    <button type="button">엽서 파기하기</button>
  </>
  );
}
