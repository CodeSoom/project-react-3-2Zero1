import errorMessages from '../text/errorMessages';
import getErrorMessage from './getErrorMessage';

describe('getErrorMessages', () => {
  context('error is false', () => {
    it('return empty', () => {
      expect(getErrorMessage({ type: 'sender', error: false })).toBe('');
    });
  });

  context('error is true', () => {
    it('return default errorMessage', () => {
      const { default: errorMessage } = errorMessages.sender;

      expect(getErrorMessage({ type: 'sender', error: errorMessage })).toBe(errorMessage);
    });
  });

  context('error is other string', () => {
    it('return default errorMessage', () => {
      const { wrong: errorMessage } = errorMessages.secretMessage;

      expect(getErrorMessage({ type: 'secretMessage', error: 'wrong' })).toBe(errorMessage);
    });
  });
});
