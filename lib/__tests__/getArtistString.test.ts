import getArtistString from '../utils/getArtistString';
import { demoTrackData } from '@/app/(data)/demoTrackData';
import { describe, expect, test } from '@jest/globals';

describe('getArtistString tests', () => {
  test('function returns a string', () => {
    // arrange
    const trackWithMultipleArtists = demoTrackData[1];

    // act
    const res = getArtistString(trackWithMultipleArtists.artists);

    // assert
    expect(typeof res).toBe('string');
  });
  test('returns a comma separated string of artist names if more than 1 artist on a track', () => {
    // arrange
    // the kid laroi
    const trackWithMultipleArtists = demoTrackData[1];

    // act
    const res = getArtistString(trackWithMultipleArtists.artists);

    // assert
    expect(res).toBe('The Kid LAROI, Justin Bieber');
  });
  test('returns a singular artist name if track only has 1 artist', () => {
    // arrange
    // justin bieber
    const trackWithOneArtist = demoTrackData[0];

    // act
    const res = getArtistString(trackWithOneArtist.artists);

    // assert
    expect(res).toBe('Dua Lipa');
  });
});
