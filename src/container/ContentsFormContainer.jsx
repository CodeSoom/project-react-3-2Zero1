import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import validator from '../utils/validate';
import { getField } from '../utils/utils';

import ContentsForm from '../presentational/ContentsForm';

import {
  setInputFieldsError,
} from '../state/slice';

export default function ContentsFormContainer({
  onClickNext,
  onClickPrevious,
  getChangeHandler,
  checkValidAccess,
}) {
  const dispatch = useDispatch();

  const {
    writePageIndex,
    inputFields,
  } = useSelector((state) => (
    {
      writePageIndex: state.writePageIndex,
      inputFields: state.inputFields,
    }
  ));

  const {
    write: { contents },
  } = inputFields;

  checkValidAccess(writePageIndex);

  const fields = {
    contents: getField({
      field: contents,
      id: 'contents',
      onChange: getChangeHandler('contents'),
    }),
  };

  function handleClick() {
    const checks = validator(fields);

    checks.forEach(([key, checked]) => {
      dispatch(setInputFieldsError({
        page: 'write',
        type: key,
        error: !checked,
      }));
    });

    if (checks.filter(([, check]) => !check).length === 0) {
      onClickNext();
    }
  }

  return ((
    <ContentsForm
      contents={fields.contents}
      onHandleClick={handleClick}
      onClickPrevious={onClickPrevious}
    />
  ));
}
