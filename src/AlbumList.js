import React, {useState, useEffect} from "react";

function AlbumList({ user = {} }) {
  const[albums, setAlbums] = useState([]);
  const title = document.title;
  
  useEffect(() => {
    const abortController = new AbortController();
    setAlbums([]);
    document.title = "Awesome Album App";
    async function loadAlbums() {
      try {
        const response = await fetch(
         `https://jsonplaceholder.typicode.com/albums?userId=${user.id}`,
          {signal: abortController.signal}
        );
        const albumsFromAPI = await response.json();
        setAlbums(albumsFromAPI);
      }catch (error) {
        if (error.name === "AbortError") {
          console.log("Aborted");
      }
    }
  }
    loadAlbums();
  
  return () => {
    document.title = title;
    return abortController.abort()};
  }, [user]);
  
  if (albums.length== 0) {
  return <p>Please click on a user name to the left</p>;
}
  
  return <div>
    <ul className = "album-list">
      {albums.map((album) => (
      <li key = {album.id}>
          <h4>{album.id} - {album.title} </h4>
          </li>
      ))}
    </ul>
    </div>
}
export default AlbumList;