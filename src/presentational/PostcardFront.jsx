import React from 'react';

import styled from '@emotion/styled';

import { PreviousButton, NextButton } from '../style/commonCss';

const PostcardFrontLayout = styled.div(() => ({
  position: 'absolute',
  height: '100%',
  top: '0px',
  right: '0px',
  left: '0px',
  bottom: '0px',
}));

const Stamp = styled.img(() => ({
  position: 'absolute',
  width: '90px',
  height: '110px',
  top: '40px',
  right: '0px',
  margin: '10px 5px 0 0',
}));

const Receiver = styled.div(() => ({
  marginTop: '20px',
  textAlign: 'center',
  fontSize: '25px',
}));

const Contents = styled.div(() => ({
  wordBreak: 'break-all',
  margin: '55px 20px 0 20px',
  fontSize: '20px',
}));

const Sender = styled.div(() => ({
  position: 'absolute',
  bottom: '20px',
  left: '50%',
  transform: 'translateX(-50%)',
}));

export default function PostcardFront({
  sender,
  receiver,
  contents,
  stampUrl,
  onHandleClickPrevious,
  onHandleClickGoToBack,
}) {
  return (
    <PostcardFrontLayout>
      <PreviousButton
        type="button"
        onClick={onHandleClickPrevious}
      >
        이전
      </PreviousButton>
      <NextButton
        type="button"
        onClick={onHandleClickGoToBack}
      >
        뒷면
      </NextButton>
      <Receiver class="receiver">{`to ${receiver}`}</Receiver>
      <Sender class="sender">{`from ${sender}`}</Sender>
      <Stamp src={stampUrl} alt="stamp" />
      <Contents>{contents}</Contents>
    </PostcardFrontLayout>
  );
}
