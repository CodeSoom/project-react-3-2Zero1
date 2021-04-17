import {
  fetchEntrance,
  postPhoto,
  postPostcard,
  postCheckValidPostcard,
  fetchPostcard,
  fetchPostcards,
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
        data: {
          url,
          secretMessage,
        },
      });
    });
  });

  describe('postCheckValidPostcard', () => {
    context('when isPrivate is true', () => {
      beforeEach(() => {
        mockFetch({
          data: {
            success: true,
          },
        });
      });

      it('return success', async () => {
        const postcard = await postCheckValidPostcard({
          key: 'test',
          secretMessage: 'secretMessage',
        });

        expect(postcard).toEqual({
          data: {
            success: true,
          },
        });
      });
    });

    context('when isPrivate is false', () => {
      beforeEach(() => {
        mockFetch({
          data: {
            success: true,
          },
        });
      });

      it('return success', async () => {
        const postcard = await postCheckValidPostcard({
          key: 'test',
          secretMessage: '',
        });

        expect(postcard).toEqual({
          data: {
            success: true,
          },
        });
      });
    });
  });

  describe('fetchPostcard', () => {
    beforeEach(() => {
      mockFetch({
        data: {
          sender: 'sender',
          receiver: 'receiver',
          photo: 'photoUrl',
          contents: 'contents',
          photoMessage: 'photoMessage',
        },
      });
    });

    it('returns postcard', async () => {
      const postcards = await fetchPostcard({ key: test, secretMessage: 'secretMessage' });

      expect(postcards).toEqual({
        data: {
          sender: 'sender',
          receiver: 'receiver',
          photo: 'photoUrl',
          contents: 'contents',
          photoMessage: 'photoMessage',
        },
      });
    });
  });

  describe('fetchPostcards', () => {
    beforeEach(() => {
      mockFetch({
        data: {
          rid: 142,
          sender: '이영한',
          receiver: '나 자신',
          photo: 'https://postcard-yh1.s3.ap-northeast-2.amazonaws.com/uploads/1618470403665_photoyh.jpeg',
          photoMessage: '힘들었지만 어느 때 보다 행복했던 그때를 기억하며..',
        },
      });
    });

    it('returns postcards', async () => {
      const postcard = await fetchPostcards();

      expect(postcard).toEqual({
        data: {
          rid: 142,
          sender: '이영한',
          receiver: '나 자신',
          photo: 'https://postcard-yh1.s3.ap-northeast-2.amazonaws.com/uploads/1618470403665_photoyh.jpeg',
          photoMessage: '힘들었지만 어느 때 보다 행복했던 그때를 기억하며..',
        },
      });
    });
  });
});
