import validate from './validate';

describe('validate', () => {
  const completeFunction = jest.fn();
  const setInputFieldsError = jest.fn();

  beforeEach(() => {
    completeFunction.mockClear();
    setInputFieldsError.mockClear();
  });

  context('when the value is satisfied condition', () => {
    it('calls completeFunction', () => {
      const fields = {
        sender: {
          value: 'name',
          error: false,
        },
        receiver: {
          value: 'name2',
          error: false,
        },
      };

      validate(fields, setInputFieldsError, completeFunction);
      expect(completeFunction).toBeCalled();
    });
  });

  context('when the value is not satisfied condition', () => {
    it('calls setInputFieldsError and does not call completeFunction', () => {
      const fields = {
        sender: {
          value: '',
          error: true,
        },
        receiver: {
          value: '',
          error: false,
        },
      };
      validate(fields, setInputFieldsError, completeFunction);

      expect(setInputFieldsError).toBeCalled();
      expect(completeFunction).not.toBeCalled();
    });
  });
});
