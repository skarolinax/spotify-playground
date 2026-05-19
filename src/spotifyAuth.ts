const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const REDIRECT_URI = "http://127.0.0.1:5174";

import { SpotifyApi } from "@spotify/web-api-ts-sdk";

export const spotifyApi = SpotifyApi.withUserAuthorization(
  CLIENT_ID,
  REDIRECT_URI,
  ["streaming", "user-read-email", "user-read-private", "user-modify-playback-state", "user-read-playback-state"]
);

export const loginSpotify = async () => {
  await spotifyApi.authenticate();
};