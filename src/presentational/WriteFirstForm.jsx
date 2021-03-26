import React from 'react'
import InputPart from './InputPart'
import RadioPart from './RadioPart'

export default function WriteFirstForm({
  fields: {
    sender,
    receiver,
    secretMessage
  },
  onHandleClick,
  onHandleRadioChange,
  isPrivate,
  onClickPrevious
}) {

  return (
  <>
    <button
      type="button"
      onClick={onClickPrevious}
    >
      이전
    </button>
    <div>엽서 작성하기</div>
    <InputPart field={sender} />
    <InputPart field={receiver} />
    <div>관리자에게 쓰고 싶은 편지가 있다면 받는 사람을 ‘관리자’로 입력해주세요.</div>
    <InputPart field={secretMessage} />
    <div>엽서를 확인 또는 파기하기 위해 사용되며 받는 사람에게도 공유됩니다.</div>
    <RadioPart
      onHandleRadioChange={onHandleRadioChange}
      isPrivate={isPrivate}
    />
    <button
      type="button"
      onClick={onHandleClick}
    >
      다음
    </button>
  </>
  );
}
