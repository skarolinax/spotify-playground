const token = import.meta.env.VITE_SPOTIFY_TOKEN;
//Helper function to fetch the Spotify API and then add any endpoint
async function fetchWebApi(endpoint: string, method: string, body?: any) {
  const res = await fetch(`https://api.spotify.com/${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method,
    body:JSON.stringify(body)
  });
  return await res.json();
}

export async function getMyFavAlbum() {
  return (await fetchWebApi(
    'v1/albums/4ms0fTBX5E76Ho0Ke4az0Q', 'GET' 
  ))
}


// export async function getTopTracks(){
//   return (await fetchWebApi(
//     'v1/me/top/tracks?time_range=long_term&limit=4', 'GET'
//   )).items;
// }

// export const topTracks = await getTopTracks();
