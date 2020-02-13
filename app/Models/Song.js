export default class Song {
  constructor(data) {
    this.title = data.trackName || data.title;
    this.albumArt =
      data.albumArt || data.artworkUrl100.replace(/100x100/g, "300x300");
    this.artist = data.artistName || data.artist;
    this.album = data.collectionName || data.album;
    this.price = data.trackPrice || data.price;
    this.preview = data.previewUrl || data.preview;
    this._id = data.trackId || data._id;
  }

  get template() {
    //let button = this._id
    
    return /* html */ `
      
        <div class="d-flex align-items-center justify-content-center border-bottom" style="padding-top: 40px; padding-bottom: 40px;">
        <div class="container align-items-center justify-content-between">
        <div class="row">  
        <div class="col"> 
             <h5>${this.artist}</h5>
             </br>
             <p>Album: ${this.album}</p>
             <p style="padding-bottom: 30px">Title: ${this.title}</p>
             <p><audio controls>
             <source src="${this.preview}" type="audio/mp3">
             <source src="${this.preview}" type="audio/ogg">
             <source src="${this.preview}" type="audio/wav">
             Your browser does not support audio preview.
         </audio>
         <!-- (${this._id}); -->
         </p>
      
        <div class="col border-left">
          <img src="${this.albumArt}" height="250"> 
          <div style="padding-top:20px">
         <button class="btn btn-danger" onclick="app.songsController.addSong('${this._id}')">   
           Add To Playlist
        </button>
        </div>   
        </div>
        </div>
        
          </div>
          </div>
          
          </div>
 
          </div>

              
    `;
  }




get playlistTemplate() {
  return /* html */ `
  
   <div class="border p-2 mb-1">
    <div class="d-flex align-items-center justify-content-between">
    <div>
      <img src="${this.albumArt}" height="65">
      <span class="ml-2">Artist: ${this.artist}</span>
      
      <span class="ml-2">Title: ${this.title}</span>
    </div>
    <div style="padding-top:20px">
         <button class="btn btn-danger" onclick="app.songsController.removeSong('${this._id}')">   
           Remove
        </button>
        </div>   
    </div>
  </div>
`;
}
}

 