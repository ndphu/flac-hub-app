import playlistService from "./PlaylistService";
import itemService from "./ItemService";

const unsavedPlaylist = {
    tracks: []
};


class PlayService {
    currentTrack = null;

    playTrack = (track) => {
        unsavedPlaylist.tracks.add(track);
        itemService.getItemSources(track).then((sources) => {
            console.log('sources', sources);
            track.sources.concat(sources)
            console.log('tracks', track)

        })
    };

    addToPlaylist = (id, tracks, autoPlay) => {
        let playlist = unsavedPlaylist;
        if (id && id !== 'unsaved') {
            playlistService.getPlaylist(id).then(playlist => {
                playlist.tracks.concat(tracks);
                playlistService.savePlaylist(playlist).then();
            })
        }
    }


}

export default PlayService;