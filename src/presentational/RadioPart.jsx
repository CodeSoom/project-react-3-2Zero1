import React from 'react';

import RadioButton from './RadioButton';

export default function RadioPart({
  onRadioChange,
  isPrivate,
}) {
  const privateValue = true;
  const publicValue = false;
  
  return (
    <>
      <div>공개 여부</div>
      <RadioButton
        id="private"
        label="비공개"
        name="isPrivate"
        value={privateValue}
        onChange={onRadioChange}
        checked={isPrivate}
      />
      <RadioButton
        id="public"
        label="공개"
        name="isPrivate"
        value={publicValue}
        onChange={onRadioChange}
        checked={!isPrivate}
      />
      <div>신중하게 선택해 주세요. 공개 시 다른 사람에게도 공개 되며 수정이 불가능 하며 공개하고 싶지 않다면 삭제 해야 합니다.</div>
    </>
  );
}
