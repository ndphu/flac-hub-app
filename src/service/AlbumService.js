import api from '../api/Api';

class AlbumService {
  getRandomAlbums = (size) => {
    if (!size) {
      size = 12
    }

    return api.get(`/recommend/album/${size}`)
  };
  getAlbum = (id) => {
    return api.get(`/album/id/${id}`)
  }
}

const albumService = new AlbumService();

export default albumService;