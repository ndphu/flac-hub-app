import api from '../api/Api';

class PlaylistService {
    getPlaylists = (page) => {
        if (page) {
            return api.get(`/playlist?page=${page}`)
        }
        else {
            return api.get(`/playlist?page=1`)
        }
    };

    createPlaylist(playlist) {
        return api.post(`/playlist`, playlist)
    }
}

const playlistService = new PlaylistService();

export default playlistService;