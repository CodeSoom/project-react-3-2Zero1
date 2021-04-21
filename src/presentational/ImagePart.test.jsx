import React from 'react';
import { fireEvent, render } from '@testing-library/react';

import ImagePart from './ImagePart';
import errorMessages from '../text/errorMessages';

describe('ImagePart', () => {
  const onHandleChangeFile = jest.fn();

  function renderImage({ path = '', errorMessage = '' }) {
    return (
      render(<ImagePart
        photo={
          {
            value: path,
            errorMessage,
            onChange: jest.fn(),
          }
        }
        onHandleChangeFile={onHandleChangeFile}
      />)
    );
  }

  context('photo.value is empty', () => {
    it("renders '이미지를 선택해 주세요' message", () => {
      const { getByText } = renderImage({});

      expect(getByText('이미지를 선택해 주세요')).not.toBeNull();

      fireEvent.click(getByText('이미지를 선택해 주세요'));
    });
  });

  context('with error message', () => {
    it("renders error message('이미지를 선택해주세요.')", () => {
      const { default: error } = errorMessages.photo;
      const { getByText } = renderImage({ errorMessage: error });

      expect(getByText('이미지를 선택해 주세요')).not.toBeNull();
    });
  });
});
