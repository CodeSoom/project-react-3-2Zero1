const validator = {
  sender: (value) => !(value.length > 5 || value.length < 2),
  receiver: (value) => !(value.length > 5 || value.length < 2),
  secretMessage: (value) => !(value.length > 15 || value.length < 5),
  photoMessage: (value) => !(value.length > 20 || value.length < 10),
}

export default validator;