import React from 'react';

export default function EntranceWritePostcard({
  sender,
  postcardCount,
  onHandleClickWritePostcard,
}) {
  return (
    <div>
      {
        postcardCount
          ? (
            <>
              <div>{`${sender}님으로 부터 받은 엽서로 ${postcardCount}번의 엽서를 작성하실 수 있어요 ! 코로나로 인해 만나보지 못한 소중한 사람에게 추억이 될 엽서를 작성해보세요 !`}</div>
              <button
                type="button"
                onClick={onHandleClickWritePostcard}
              >
                엽서 작성하기
              </button>
            </>
          ) : ('해당 엽서로 작성할 수 있는 횟수가 없습니다.')
      }
    </div>
  );
}
