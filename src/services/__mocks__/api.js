export const fetchEntrance = jest.fn();

export async function postPhoto() {
  const fileName = 'test';
  return fileName;
}

export const postPostcard = jest.fn();

export const postCheckValidPostcard = jest.fn();

export const fetchPostcard = jest.fn();

export async function fetchPostcards() {
  return { data: [] };
}
