import React from 'react';

import PostcardFront from './PostcardFront';
import PostcardBack from './PostcardBack';

import {
  DefaultLayout,
} from '../style/commonCss';

export default function Postcard({
  postcard: {
    receiver,
    sender,
    contents,
    photoMessage,
    photoUrl,
  },
  isFrontPage,
  onHandleClickFlip,
  onHandlePreviousClick,
  showCompleteButton,
  onHandleCompleteClick,
}) {
  return (
    <DefaultLayout>
      {
        isFrontPage ? (
          <PostcardFront
            sender={sender}
            receiver={receiver}
            contents={contents}
            stampUrl="https://postcard-yh1.s3.ap-northeast-2.amazonaws.com/uploads/1618645093193_%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA+2021-04-17+%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE+4.37.12.png"
            onHandleClickPrevious={onHandlePreviousClick}
            onHandleClickGoToBack={onHandleClickFlip}
          />
        )
          : (
            <PostcardBack
              photoUrl={photoUrl}
              photoMessage={photoMessage}
              showCompleteButton={showCompleteButton}
              onHandleCompleteClick={onHandleCompleteClick}
              onHandleClickGoToFront={onHandleClickFlip}
            />
          )
      }
    </DefaultLayout>
  );
}
