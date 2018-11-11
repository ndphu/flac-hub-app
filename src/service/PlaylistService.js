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
}

const playlistService = new PlaylistService();

export default playlistService;