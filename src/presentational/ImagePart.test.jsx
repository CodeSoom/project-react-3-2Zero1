import React from 'react';
import { fireEvent, render } from '@testing-library/react';

import ImagePart from './ImagePart';
import errorMessages from '../text/errorMessages';

describe('ImagePart', () => {
  const onHandleChangeFile = jest.fn();
  function renderImage({ path='', errorMessage='' }) {
    return (
      render(<ImagePart
          photo={{
            value: path,
            errorMessage,
            onChange: jest.fn(),
          }}
          onHandleChangeFile={onHandleChangeFile}
        />)
    );
  }

  context('photo.value is empty', () => {
    it("render '이미지를 선택해 주세요' message", () => {
      const { getByText } = renderImage({});

      expect(getByText('이미지를 선택해 주세요')).not.toBeNull();
    });
  });

  context('with error message', () => {
    it("render error message('이미지를 선택해주세요.')", () => {
      const { getByText } = renderImage({ errorMessage: errorMessages['photo'] });

      expect(getByText('이미지를 선택해 주세요')).not.toBeNull();
    })
  })

  // context('photo.value is not empty', () => {
  //   it("render image file", () => {
  //     const { getByText } = renderImage('imageFile');

  //     expect(getByText('이미지를 선택해 주세요')).toBeNull();
  //   });
  // });
});
