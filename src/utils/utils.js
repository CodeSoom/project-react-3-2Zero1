import placeholders from '../text/placeholders';
import errorMessages from '../text/errorMessages';

export function get(key) {
  return (obj) => obj[key];
}

export function equal(key, value) {
  return (obj) => obj[key] === value;
}

export function getField ({ field: { value, error }, id, name, onChange }) {
  return ({
    id,
    name,
    value,
    placeholder: placeholders[id],
    errorMessage: error ? errorMessages[id] : '',
    onChange,
  });
};
