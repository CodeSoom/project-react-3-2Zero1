const conditions = {
  sender: (value) => !(value.length > 5 || value.length < 2),
  receiver: (value) => !(value.length > 5 || value.length < 2),
  secretMessage: (value) => !(value.length > 15 || value.length < 5),
  contents: (value) => !(value.length > 200 || value.length < 30),
  photoMessage: (value) => !(value.length > 30 || value.length < 10),
  photo: (value) => !!value,
};

function validator(fields, setInputFieldsError, completeFunction) {
  const checkResults = Object.entries(fields)
    .map(([key, field]) => ([key, conditions[key](field.value)]));

  checkResults.forEach((item) => {
    setInputFieldsError(item);
  });

  if (checkResults.filter(([, check]) => !check).length === 0) {
    completeFunction();
  }
}
export default validator;
