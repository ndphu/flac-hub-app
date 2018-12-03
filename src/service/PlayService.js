import playlistService from "./PlaylistService";
import trackService from "./TrackService";

function generateRandom(min, max, except) {
    let num = Math.floor(Math.random() * (max - min + 1)) + min;
    return (num === except) ? generateRandom(min, max) : num;
};

class PlayService {
    index = -1;
    track = null;
    tracks = [];
    loopMode = 'all';

    setPlayer = (player) => {
        this.player = player;
    };

    setTrackList = (trackList) => {
        this.trackList = trackList.slice(0);
    };

    playTrack = (trackId) => {
        this.index = this.tracks.findIndex((t => {
            return t._id === trackId
        }));
        trackService.getItemSources(this.tracks[this.index]).then((sources) => {
            this.tracks[this.index].sources = sources;
            this.player.playTrack(this.tracks[this.index]);
        })
    };

    playTrackInPlaylist = (playlist, index) => {
        this.currentPlaylist = playlist;
        this.currentIndex = index;
        this.currentTrack = this.currentPlaylist.trackList[this.currentIndex];
        trackService.getItemSources(this.currentTrack).then((sources) => {
            this.currentTrack.sources = sources;
            this.player.playTrack(this.currentTrack);
        });
    };

    next = () => {
        if (this.shuffle) {
            if (this.currentPlaylist.trackList && this.currentPlaylist.trackList.length > 0) {
                const nextIndex = generateRandom(0, this.currentPlaylist.trackList.length - 1, this.currentIndex);
                this.playTrackInPlaylist(this.currentPlaylist, nextIndex);
            }
        } else {
            if (this.currentPlaylist.trackList && this.currentPlaylist.trackList.length > 0) {
                this.currentIndex++;
                if (this.currentIndex >= this.currentPlaylist.tracks.length) {
                    this.currentIndex = 0;
                }
            }

            this.playTrackInPlaylist(this.currentPlaylist, this.currentIndex);
        }
    };

    prev = () => {
        this.currentIndex--;
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
        let source = track.sources.filter(s => this.isHQPlayback() ? s.quality === '320kbps' : s.quality === '128kbps').pop();
        if (!source) {
            source = track.sources[0];
        }
        return source.source
    };

    isHQPlayback = () => {
        return true;
    };
}

const playService = new PlayService();

export default playService;