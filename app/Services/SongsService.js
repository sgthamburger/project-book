import Song from "../Models/Song.js";
import store from "../store.js";
import SongsController from "../Controllers/SongsController.js";

// @ts-ignore
//TODO Change YOURNAME to your actual name
let _sandBoxUrl = "//bcw-sandbox.herokuapp.com/api/levi/songs";

class SongsService {
  constructor() {
    // NOTE this will get your songs on page load
  }

  /**
   * Takes in a search query and retrieves the results that will be put in the store
   * @param {string} query
   */
  async getMusicByQuery(query) {
    // NOTE You will not need to change this method
    let url = "https://itunes.apple.com/search?&term=" + query;
    let response = await fetch(url);
    let data = await response.json();
    store.state.songs = data.results.map(data => new Song(data));
    
    console.log("THE SONG DATA from apple", data.results);
  }

  /**
   * Retrieves the saved list of songs from the sandbox
   */
  async getMySongs() {
    let response = await fetch(_sandBoxUrl);
    let data = await response.json();
    console.log("MY Sandbox SONGS", data.data);
    store.state.mySongs = data.data.map(songData => new Song(songData));
  }

  /**
   * Takes in a song id and sends it from the search results to the sandbox to be saved.
   * Afterwords it will update the store to reflect saved info
   * @param {string} id
   */
  async addSong(_id) {
    //TODO you only have an id, you will need to find it in the store before you can post it
    //TODO After posting it what should you do?
    let found = store.state.mySongs.find(s => s._id == _id);
    if (found) {
      throw new Error("already saved");
    }
    
    let song = store.state.songs.find(s => s._id == _id);
    let response = await fetch(_sandBoxUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
       },
       body: JSON.stringify(song)
    });
    let data = await response.json();

    let songs = new Song(data.data);
    store.state.mySongs.push(song);
    this.getMySongs();
    }
  

  /**
   * Sends a delete request to the sandbox to remove a song from the playlist
   * Afterwords it will update the store to reflect saved info
   * @param {string} id
   */
  
    //TODO Send the id to be deleted from the server then update the store
    async removeSong(id) {
      //TODO you only have an id, you will need to find it in the store before you can post it
      //TODO After posting it what should you do?
      
      //let song = store.state.mySongs.find(s => s._id == id);
      //let response = 
      await fetch(_sandBoxUrl + "/" + id, {
        method: "DELETE",
      });
         let i = store.state.mySongs.findIndex(s => s._id == id);
          if (i != -1) {
            store.state.mySongs.splice(i, 1);
          }
         store.state.songs.push(i);
        console.log("trying to remove");
        
      //store.state.songs = data.results.map(data => new Song(data));
      //commenting the above which works but only on a manual refresh, trying to figure out how to marry the ID's so i can delete from sandbox 
      
}

/* //removePokemon example
async releasePokemon(id) {
  await fetch(SANDBOXURL + id, {
    method: "DELETE"
  });
  let i = STORE.state.myPokemon.findIndex(p => p._id == id);
  if (i != -1) {
    STORE.state.myPokemon.splice(i, 1);
  }
  STORE.state.activePokemon = new Pokemon();
} */
}






export const songsService = new SongsService();
// export default service;
