import React from 'react'
import InputPart from './InputPart'

export default function EntranceCheckForm({
  isPrivate,
  onClick,
  onChange,
  field: {
    value,
    placeholder,
    errorMessage
  },
}) {

  function handleClick(value) {
    onClick(value);
  }

  const field = {
    id: 'secretMessage',
    name: '비밀 메시지',
    value: value,
    placeholder: placeholder,
    errorMessage: errorMessage,
    onChange: onChange,
  }

  return (
  <>
    {
      isPrivate ? (
        <>
          <InputPart field={field} />
          <div>비공개 엽서입니다. 문자로 받은 비밀 메시지를 입력 후 엽서 확인하기 버튼을 눌러주세요.</div>
        </>
      ) : null
    }
    <button
      type="button"
      onClick={()=>handleClick(value)}
    >
      엽서 확인하기
    </button>
  </>
  );
}
