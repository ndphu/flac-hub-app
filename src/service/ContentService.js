import api from '../api/Api';
import config from '../api/Config'
class ContentService {
  getAlbumCoverUrl = (id) => {
    return `${config.contentBaseUrl}/album/${id}/cover`
  };

  getTrackAlbumArt = (id) => {
    return `${config.contentBaseUrl}/track/${id}/cover`;
  }
}

const contentService = new ContentService();

export default contentService;