import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import InformationFormContainer from '../container/InformationFormContainer';
import ContentsFormContainer from '../container/ContentsFormContainer';
import PhotoFormContainer from '../container/PhotoFormContainer';
import PreviewContainer from '../container/PreviewContainer';
import WriteCompleteContainer from '../container/WriteCompleteContainer';

import { DefaultLayout } from '../style/commonCss';

import {
  increaseWritePageIndex,
  decreaseWritePageIndex,
} from '../state/slice';

export default function WritePage({ params }) {
  const { index } = params || useParams();

  const history = useHistory();

  const dispatch = useDispatch();

  function handleNextClick() {
    dispatch(increaseWritePageIndex());
    history.replace(`/write/${+index + 1}`);
  }

  function handlePreviousClick() {
    if (+index === 0) {
      // 이곳에서 입력값 모두 초기화.
      history.goBack();
      return;
    }

    dispatch(decreaseWritePageIndex());

    history.replace(`/write/${+index - 1}`);
  }

  function handleHomeClick() {
    history.goBack();
  }

  function checkValidAccess(indexInRedux) {
    if (index > indexInRedux) {
      history.replace(`/write/${indexInRedux}`);
    }
  }

  const writeContainers = {
    0: (
      <InformationFormContainer
        onClickNext={handleNextClick}
        onClickPrevious={handlePreviousClick}
        checkValidAccess={checkValidAccess}
      />
    ),
    1: (
      <ContentsFormContainer
        onClickNext={handleNextClick}
        onClickPrevious={handlePreviousClick}
        checkValidAccess={checkValidAccess}
      />
    ),
    2: (
      <PhotoFormContainer
        onClickNext={handleNextClick}
        onClickPrevious={handlePreviousClick}
        checkValidAccess={checkValidAccess}
      />
    ),
    3: (
      <PreviewContainer
        onClickNext={handleNextClick}
        onClickPrevious={handlePreviousClick}
        checkValidAccess={checkValidAccess}
      />
    ),
    4: (
      <WriteCompleteContainer
        onClickHome={handleHomeClick}
        checkValidAccess={checkValidAccess}
      />
    ),
  };
  return (
    <DefaultLayout>
      {writeContainers[index]}
    </DefaultLayout>
  );
}
