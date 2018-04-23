import api from '../api/Api';

class SearchService {
  search = (query, page) => {
    return api.get(`/search/q/${btoa(query)}?page=${page}`)
  };
  
  searchByArtist(query, page) {
    return api.get(`/search/byArtist/${btoa(query)}/tracks?page=${page}`)
  }
}

const searchService = new SearchService();

export default searchService;