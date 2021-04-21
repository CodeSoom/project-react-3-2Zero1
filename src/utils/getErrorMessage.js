import errorMessages from '../text/errorMessages';

export default function getErrorMessage({ type, error }) {
  if (!error) return '';

  if (!errorMessages[type][error]) {
    return errorMessages[type].default;
  }

  return errorMessages[type][error];
}
