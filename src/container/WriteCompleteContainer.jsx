import React from 'react';
import { useSelector } from 'react-redux';

export default function WriteCompleteContainer({
  onClickHome,
  checkValidAccess,
}) {
  const { writePageIndex } = useSelector((state) => ({
    writePageIndex: state.writePageIndex,
  }));

  checkValidAccess(writePageIndex);

  function handleClickHome() {
    // dispatch(resetPostcard());
    onClickHome();
  }

  function handleClickCopyMessage() {
    // 메시지 클립보드에 입력하는 코드.
  }
  return (
    <>
      <button
        type="button"
        onClick={handleClickHome}
      >
        홈로고
      </button>
      <div>엽서 제작이 완료 되었습니다.</div>
      <div>밑의 버튼을 클릭하면 전송 메시지가 복사됩니다.</div>
      <div>카카오톡이나 문자 메시지에 붙혀 넣고 전송해보세요!</div>
      <div>반드시 전송 메시지를 복사해주세요. 페이지를 이탈 시 해당 엽서는 찾을 수 없습니다.</div>
      <button
        onClick={handleClickCopyMessage}
        type="button"
      >
        전송 메시지 복사
      </button>
      <div>
        링크와 비밀메시지는 관련된 사람 이외에 공유 하지 말아주세요! 공유가 된다면 다른 사람이 삭제할 수도 있어요!
        링크를 지우지 말아주세요. 링크를 잊어 버린다면 다시는 엽서를 보지 못할 수도 있으며, 삭제도 할 수 없습니다.
      </div>
    </>
  );
}
