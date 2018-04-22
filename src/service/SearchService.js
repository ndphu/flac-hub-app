import api from '../api/Api';

class SearchService {
  search = (query, page) => {
    return api.get(`/search/q/${query}?page=${page}`)
  };
}

const searchService = new SearchService();

export default searchService;