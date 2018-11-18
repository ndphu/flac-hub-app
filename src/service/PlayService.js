import playlistService from "./PlaylistService";
import itemService from "./ItemService";

function generateRandom(min, max, except) {
  let num = Math.floor(Math.random() * (max - min + 1)) + min;
  return (num === except) ? generateRandom(min, max) : num;
};

class PlayService {
  currentTrack = null;
  currentPlaylist = null;
  currentIndex = 0;
  unsavedPlaylist = {
    tracks: []
  };
  loopMode = 'all';

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

  playTrackInPlaylist = (playlist, index) => {
    console.log('playTrackInPlaylist', playlist, index);
    this.currentPlaylist = playlist;
    this.currentIndex = index;
    this.currentTrack = this.currentPlaylist.tracks[this.currentIndex];
    itemService.getItemSources(this.currentTrack).then((sources) => {
      this.currentTrack.sources = sources;
      this.player.playTrack( this.currentTrack);
    });
  };


  addToPlaylist = (id, tracks, autoPlay) => {
    let playlist = this.unsavedPlaylist;
    if (id && id !== 'unsaved') {
      playlistService.getPlaylist(id).then(playlist => {
        playlist.tracks.concat(tracks);
        playlistService.savePlaylist(playlist).then();
      })
    }
  };


  next = () => {
    if (this.shuffle) {
      const nextIndex = generateRandom(0, this.currentPlaylist.tracks.length - 1, this.currentIndex);
      this.playTrackInPlaylist(this.currentPlaylist, nextIndex);
    } else {
      this.currentIndex ++;
      if (this.currentIndex >= this.currentPlaylist.tracks.length) {
        this.currentIndex = 0;
      }

      this.playTrackInPlaylist(this.currentPlaylist, this.currentIndex);
    }
  };

  prev = () => {
    this.currentIndex --;
    if (this.currentIndex < 0) {
      this.currentIndex = this.currentPlaylist.tracks.length - 1;
    }

    this.playTrackInPlaylist(this.currentPlaylist, this.currentIndex);
  };

  setLoopMode = (mode) => {
    this.loopMode = mode;
  };

  isLoopOne = () => {
    return this.loopMode === 'one';
  };

  isLoopAll = () => {
    return this.loopMode === 'all';
  };

  isLoopDisable = () => {
    return this.loopMode === 'none';
  };

  setShuffle = (shuffle) => {
    this.shuffle = shuffle;
  };

  isShuffleEnabled = () => {
    return this.shuffle;
  };

  getSource = (track) => {
    if (this.isHQPlayback())  {
      return track.sources.filter(s => s.source.endsWith('mp3')).pop().source;
    }
    return track.sources[0].source;
  };

  isHQPlayback = () => {
    return true;
  };
}

const playService = new PlayService();

export default playService;