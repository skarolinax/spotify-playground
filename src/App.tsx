import { useState, useEffect } from "react";
import "./styles/main.scss";
import playIcon from "./assets/images/play-pause.svg";
import nextIcon from "./assets/images/play-next.svg";

// import { getTopTracks } from "./spotifyConfig";
import { getMyFavAlbum } from "./spotifyConfig";

function App() {

  const [myFavAlbum, setMyFavAlbum] = useState<any>(null);

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
              <p>{myFavAlbum.artists.map((artist: any) => artist.name).join(" & ")}</p>
              <p>{myFavAlbum.tracks.items.map((track:any) => (
                <p>{track.name}</p>
              ))}</p>
            </div>
          )}
        </div>
        <div id="ipod-controls">
            <button className="play-button">
                <img src={playIcon} alt="Play/Pause" />
            </button>
            <button className="next-button">
                <img src={nextIcon} alt="Next" />
            </button>
            <button className="prev-button">
                <img src={nextIcon} alt="Previous" />
            </button>
        </div>


      </div>
    </main>
     
    </>
  )
}

export default App
