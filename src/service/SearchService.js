import api from '../api/Api';

class SearchService {
  search = (query, page) => {
    return api.get(`/search/q/${btoa(unescape(encodeURIComponent(query)))}?page=${page}`)
  };
  
  searchByArtist = (query, page, size) => {
    if (!size) {
      size = 25
    }
    //return api.get(`/search/byArtist/${btoa(unescape(encodeURIComponent(query)))}/tracks?page=${page}`)
      return api.get(`/search/q/${btoa(unescape(encodeURIComponent(query)))}/artist/tracks?page=${page}&size=${size}`)
  };

  searchByAlbum = (query, page) => {
    return api.get(`/search/byAlbum/${btoa(unescape(encodeURIComponent(query)))}/tracks?page=${page}`)
  };
}

const searchService = new SearchService();

export default searchService;