import filterTracksByArtist from '../utils/filterTracksByArtist';
import { demoTrackData } from '@/app/(data)/demoTrackData';
import { describe, expect, test } from '@jest/globals';

describe('filterTracksByArtist tests', () => {
  test('function returns an array', () => {
    // arrange
    // the kid laroi
    const artistId = '2tIP7SsRs7vjIcLrU85W8J';

    // act
    const res = filterTracksByArtist(artistId, demoTrackData);

    // assert
    expect(Array.isArray(res)).toBe(true);
  });
  test('function filters tracks by artist id', () => {
    // arrange
    // the kid laroi
    const artistId = '2tIP7SsRs7vjIcLrU85W8J';

    // act
    const res = filterTracksByArtist(artistId, demoTrackData);

    // assert
    expect(res.length).toBeGreaterThan(0);
    res.forEach((track) => expect(track.artists[0].id).toBe(artistId));
  });
  test('filter works for tracks with more than 1 artist', () => {
    // arrange
    // justin bieber
    const artistId = '1uNFoZAHBGtllmzznpCI3s';

    // act
    const res = filterTracksByArtist(artistId, demoTrackData);

    // assert
    expect(res.length).toBeGreaterThan(0);
    // only one of the artists needs to be in the artists array.
    res.forEach((track) => {
      expect(track.artists.some((artist) => artist.id === artistId)).toBe(true);
    });
  });
});
