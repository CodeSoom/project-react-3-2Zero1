import {
  fetchEntrance,
  postPhoto,
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
    it('mock', async () => {
      const photo = await postPhoto({ file: 'file' });

      expect(photo).toBe(imageURL);
    });
  });
});
