import store from "../store.js";
import { songsService } from "../Services/SongsService.js";

//Private
/**Draws the Search results to the page */
function _drawResults() {
  console.log("drawing songs from apple");
  let template = "";
  store.state.songs.forEach(songs => {
    template += songs.template;
  });
  document.getElementById("songs").innerHTML = template;  
}


/**Draws the Users saved songs to the page */
function _drawPlaylist() {
  let template = "";
  store.state.mySongs.forEach(song => {
    template += song.playlistTemplate;
  });
  document.getElementById("playlist").innerHTML = template;
}

//Public
export default class SongsController {
  constructor() {
    // TODO load your playlist
    this.getMySongs();
    //store.subscribe("mySongs", _drawPlaylist)
  }

  async getMySongs () {
    await songsService.getMySongs ()
    _drawPlaylist();
    
  } 



  /**Takes in the form submission event and sends the query to the service */
  async search(e) {
    //NOTE You dont need to change this method
    e.preventDefault();
    try {
      await songsService.getMusicByQuery(e.target.query.value);
      //console.log("trying to draw results");      
      _drawResults();
      console.log("did i draw results?");
      
    } catch (error) {
      console.error(error);
    }
  }

  /* /**
   * Takes in a song id and sends it to the service in order to add it to the users playlist
   * @param {string} id
   */
async addSong(_id) {
    try {
      await songsService.addSong(_id);
      console.log("trying to add my playlist");
      
      _drawPlaylist();
      console.log("did i draw my playlist?");
      
      
        } catch (error) {
          console.log(error);
        }          
      }





  /**
   * Takes in a song id to be removed from the users playlist and sends it to the server
   * @param {string} id
   */
    async removeSong(id) {
    try {
      await songsService.removeSong(id);
      console.log("trying to delete from my playlist");
      console.log("did i delete from my playlist?");
      _drawPlaylist();
      console.log("did i draw my playlist?");
      
      
        } catch (error) {
          
        }          
      }
        
}
