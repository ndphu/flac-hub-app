import playlistService from "./PlaylistService";
import itemService from "./ItemService";


class PlayService {
  currentTrack = null;
  unsavedPlaylist = {
    tracks: []
  };

  setPlayer = (player) => {
    this.player = player;
  };

  playTrack = (track) => {
    this.unsavedPlaylist.tracks.push(track);
    itemService.getItemSources(track).then((sources) => {
      track.sources = sources;
      this.player.playTrack(track);
    })
  };

  addToPlaylist = (id, tracks, autoPlay) => {
    let playlist = this.unsavedPlaylist;
    if (id && id !== 'unsaved') {
      playlistService.getPlaylist(id).then(playlist => {
        playlist.tracks.concat(tracks);
        playlistService.savePlaylist(playlist).then();
      })
    }
  }


}

const playService = new PlayService();

export default playService;