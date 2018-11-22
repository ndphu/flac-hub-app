import api from '../api/Api';

class ItemService {
  getItemSources = (item) => {
    // return api.post('/source', {
    //   url: btoa(item.link)
    // });

    return api.get(`/track/${item._id}`)
  }



}

const itemService = new ItemService();

export default itemService;