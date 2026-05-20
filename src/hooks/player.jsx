import React from "react";
import SpotifyPlayer from "react-spotify-web-playback";


// Apparently the library doesnt support ts? 
const Player = ({ token, myFavAlbum, currentIndex, isPlaying }) => {
  const currentTrackUri = myFavAlbum.tracks.items[currentIndex].uri; 

  return (
    <SpotifyPlayer
      token={token}
      uris={[currentTrackUri]}
      play={isPlaying}
    />
  );
};

export default Player;