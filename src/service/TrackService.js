import api from '../api/Api';

class TrackService {
  getItemSources = (item) => {
    return api.get(`/track/${item._id}/sources`)
  }



}

const trackService = new TrackService();

export default trackService;