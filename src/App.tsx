import { useState, useEffect } from "react";
import "./styles/main.scss";
import playIcon from "./assets/images/play-pause.svg";
import nextIcon from "./assets/images/play-next.svg";

// import { getTopTracks } from "./spotifyConfig";
import { getMyFavAlbum } from "./spotifyConfig";

import {
  loginSpotify,
  spotifyApi
} from "./spotifyAuth";

//@ts-ignore;
import Player from "./hooks/player.jsx";

function App() {

  const [myFavAlbum, setMyFavAlbum] = useState<any>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
      const getToken = async () => {
        const t = await spotifyApi.getAccessToken();
        if (t) setToken(t.access_token);
      };

      getToken();
    }, []);

  // useEffect(() => {
  //   const checkLogin = async () => {
  //     const token = await spotifyApi.getAccessToken();
  //     if (token) setLoggedIn(true);
  //   };

  //   checkLogin();
  // }, []);

  const playPreviousSong = () => {
    setCurrentIndex((prevIndex) => Math.max(0, prevIndex - 1));
  }

  const playNextSong = () => {
    setCurrentIndex((prevIndex) => Math.min(myFavAlbum.tracks.items.length - 1, prevIndex + 1));
  }

  const togglePlayPause = () => {
    setIsPlaying((prev) => !prev);
    Player.pause;
    console.log(isPlaying ? "Pausing song" : "Playing song");
  }

  // const [tracks, setTracks] = useState<any[]>([]);

  // const fetchTracks = async () => {
  //   const topTracks = await getTopTracks();
  //   setTracks(topTracks);
  // }

  // useEffect(() => {
  //   fetchTracks();
  // }, []);

  const fetchAlbum = async () => {
    const myFavAlbum = await getMyFavAlbum();
    console.log(myFavAlbum);
    setMyFavAlbum(myFavAlbum);
  }

  useEffect(() => {
    fetchAlbum();
  }, []);

  return (
    <>

    <main>

       {!loggedIn ? (
        <button onClick={loginSpotify}>
          Login with Spotify 🎧
        </button>
      ) : (
        <div>
          <h2>Logged in 🎉</h2>
          <p>Token received</p>
        </div>
      )}

      <div id="ipod">
        <div id="ipod-screen">

          {/* {tracks?.map((track) => (
            <div key={track.id}>
              <img
                src={track.album.images[0].url}
                width={80}
                height={80}
              />
              <p>{track.name}</p>
              <p>{track.artists.map((artist:any) => artist.name).join(" & ")}</p>
            </div>
          ))} */}

          {myFavAlbum && (
            <div key={myFavAlbum.id}>
              <img
                src={myFavAlbum.images[1].url}
                width={80}
                height={80}
              />
              <p>{myFavAlbum.name}</p>
              <p>{myFavAlbum.tracks.items[currentIndex]?.name || "No track selected"} by {myFavAlbum.artists.map((artist: any) => artist.name).join(" & ")}</p>
              <p>{isPlaying ? "Playing" : "Paused"}</p>
              
              <Player 
                myFavAlbum={myFavAlbum}
                currentIndex={currentIndex}
                isPlaying={isPlaying}
                token={token} />

              {/* <iframe
                src={`https://open.spotify.com/embed/track/${myFavAlbum.tracks.items[currentIndex]?.id}`}
                width="300"
                height="80"
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              /> */}
            </div>
          )}
        </div>
        <div id="ipod-controls">
            <button className="play-button" onClick={togglePlayPause}>
                <img src={playIcon} alt="Play/Pause" />
            </button>
            <button className="next-button" onClick={playNextSong}>
                <img src={nextIcon} alt="Next" />
            </button>
            <button className="prev-button" onClick={playPreviousSong}>
                <img src={nextIcon} alt="Previous" />
            </button>
        </div>


      </div>
    </main>
     
    </>
  )
}

export default App
