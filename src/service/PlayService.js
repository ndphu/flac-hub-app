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
        this.tracks = trackList.slice(0);
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

    playTrackByIndex = (idx) => {
        if (idx >= 0) {
            this.index = idx;
        }
        trackService.getItemSources(this.tracks[this.index]).then((sources) => {
            this.tracks[this.index].sources = sources;
            this.player.playTrack(this.tracks[this.index]);
        })
    };

    next = () => {
        if (this.shuffle) {
            if (this.tracks && this.tracks.length > 0) {
                const nextIndex = generateRandom(0, this.tracks.length - 1, this.index);
                this.playTrackByIndex(nextIndex);
            }
        } else {
            if (this.tracks && this.tracks.length > 0) {
                this.index++;
                if (this.index >= this.tracks.length) {
                    this.index = 0;
                }
                this.playTrackByIndex();
            }
        }
    };

    prev = () => {
        this.index--;
        if (this.index < 0) {
            this.index = this.tracks.length - 1;
        }

        this.playTrackByIndex();
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