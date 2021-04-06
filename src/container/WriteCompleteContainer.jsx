import React from 'react';
import { useSelector } from 'react-redux';

import styled from '@emotion/styled';

const Wrapper = styled.div(() => ({
  margin: '0 20px',
}));

const Title = styled.div(() => ({
  fontSize: '20px',
  marginBottom: '20px',
  textAlign: 'center',
}));

const Information = styled.p(() => ({
  margin: '5px 15px',
  fontSize: '12px',
  color: 'gray',
  textAlign: 'center',
}));

const Text = styled.div(() => ({
  textAlign: 'center',
  margin: '10px 0',
}));

const CenterBox = styled.div(() => ({
  textAlign: 'center',
}));

const Button = styled.button(() => ({
  fontSize: '16px',
  margin: '10px',
  padding: '5px 8px',
}));

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
    <Wrapper>
      <Button
        type="button"
        onClick={handleClickHome}
      >
        홈로고
      </Button>
      <Title>엽서 제작이 완료 되었습니다.</Title>
      <Text>밑의 버튼을 클릭하면 전송 메시지가 복사됩니다.</Text>
      <Text>카카오톡이나 문자 메시지에 붙혀 넣고 전송해보세요!</Text>
      <Text>반드시 전송 메시지를 복사해주세요. 페이지를 이탈 시 해당 엽서는 찾을 수 없습니다.</Text>
      <CenterBox>
        <Button
          onClick={handleClickCopyMessage}
          type="button"
        >
          전송 메시지 복사
        </Button>
      </CenterBox>
      <Information>
        링크와 비밀메시지는 관련된 사람 이외에 공유 하지 말아주세요! 공유가 된다면 다른 사람이 삭제할 수도 있어요!
        링크를 지우지 말아주세요. 링크를 잊어 버린다면 다시는 엽서를 보지 못할 수도 있으며, 삭제도 할 수 없습니다.
      </Information>
    </Wrapper>
  );
}
