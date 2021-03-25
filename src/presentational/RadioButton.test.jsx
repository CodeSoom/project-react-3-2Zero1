import React from 'react';

import RadioButton from './RadioButton';

import { fireEvent, getByLabelText, render } from '@testing-library/react';

import placeholders from '../text/placeholders';

test('RadioButton', () => {
  
  const onChange = jest.fn();

  const { getByLabelText } = render(
    <RadioButton
      id={'id'}
      label={'label'}
      name={'name'}
      value={'value'}
      onChange={onChange}
      checked={false}
    />
  );
  const radio = getByLabelText('label');

  expect(radio).not.toBeNull();
  expect(radio.value).toBe('value');
  expect(radio).not.toBeChecked();

  fireEvent.click(radio);
  expect(onChange).toBeCalled();
});
