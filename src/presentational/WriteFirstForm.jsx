import React from 'react'
import Input from './Input'

export default function WriteFirstForm({
  fields: {
    sender,
    receiver,
    secretMessage
  },
  onHandleClick,
}) {

  function what(event) {
    const { target: { value } } = event;
    console.log('뭐야 뭐가 문제야', value);
    onHandleClick(value)
  }

  return (
  <>
    <Input field={sender} />
    <Input field={receiver} />
    <div>관리자에게 쓰고 싶은 편지가 있다면 받는 사람을 ‘관리자’로 입력해주세요.</div>
    <Input field={secretMessage} />
    <div>엽서를 확인 또는 파기하기 위해 사용되며 받는 사람에게도 공유됩니다.</div>
    <button
      type="button"
      onClick={onHandleClick()}
    >
      다음
    </button>
    <input
      onChange={what}
      />
  </>
  );
}
