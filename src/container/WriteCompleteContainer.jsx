import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { CopyToClipboard } from 'react-copy-to-clipboard';

import styled from '@emotion/styled';

import { resetPostcardInputFields } from '../state/slice';

import Information from '../style/Information';

const Wrapper = styled.div(() => ({
  margin: '0 20px',
}));

const Title = styled.div(() => ({
  fontSize: '20px',
  marginBottom: '20px',
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
  const dispatch = useDispatch();

  const { writePageIndex, inputFields } = useSelector((state) => ({
    writePageIndex: state.writePageIndex,
    inputFields: state.inputFields,
  }));

  const {
    write: {
      sender: {
        value: senderName,
      },
      complete: {
        url,
        secretMessage,
      },
    },
  } = inputFields;
  const host = 'localhost:8080?key=';

  const secretMessageText = secretMessage ? `\n\n비밀 메시지: ${secretMessage}` : '';

  const copyText = `${senderName}님으로 부터 엽서가 도착했습니다.\n\n엽서 링크 :${host}${url} ${secretMessageText}\n\n링크와 비밀메시지는 관련된 사람 이외의 사람에게 공유하지 말아주세요!\n\n공유가 된다면 다른 사람에 의해 삭제될 수 있습니다.`;

  checkValidAccess(writePageIndex);

  function handleClickHome() {
    dispatch(resetPostcardInputFields());
    onClickHome();
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
        <CopyToClipboard text={copyText}>
          <Button type="button">
            전송 메시지 복사
          </Button>
        </CopyToClipboard>
      </CenterBox>
      <Information>
        링크와 비밀메시지는 관련된 사람 이외에 공유 하지 말아주세요! 공유가 된다면 다른 사람이 삭제할 수도 있어요!
        링크를 지우지 말아주세요. 링크를 잊어 버린다면 다시는 엽서를 보지 못할 수도 있으며, 삭제도 할 수 없습니다.
      </Information>
    </Wrapper>
  );
}
