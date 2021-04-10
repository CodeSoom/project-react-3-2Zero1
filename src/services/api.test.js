import {
  fetchEntrance,
  postPhoto,
  postPostcard,
} from './api';

import ENTRANCE from '../fixtures/entrance';

describe('api', () => {
  const mockFetch = (data) => {
    global.fetch = jest.fn().mockResolvedValue({
      async json() { return data; },
    });
  };

  describe('fetchEntrance', () => {
    beforeEach(() => {
      mockFetch(ENTRANCE);
    });

    it('returns entrance', async () => {
      const entrance = await fetchEntrance({ key: 4 });

      expect(entrance).toEqual(ENTRANCE);
    });
  });

  describe('postPhoto', () => {
    const imageURL = 'url';
    beforeEach(() => {
      mockFetch({
        data: {
          photo: imageURL,
        },
      });
    });
    it('return imageURL', async () => {
      const photo = await postPhoto({ file: 'file' });

      expect(photo).toBe(imageURL);
    });
  });
  describe('postPostcard', () => {
    const url = 'url';
    const secretMessage = 'secretMessage';
    beforeEach(() => {
      mockFetch({
        data: {
          url,
          secretMessage,
        },
      });
    });
    it('return url and secretMessage', async () => {
      const postcard = await postPostcard({
        key: 'test',
        sender: 'sender',
        receiver: 'receiver',
        contents: 'contents',
        photo: 'photo',
        photoMessage: 'photoMessage',
        secretMessage: 'secretMessage',
        isPrivate: 'isPrivate',
      });

      expect(postcard).toEqual({
        url,
        secretMessage,
      });
    });
  });
});
