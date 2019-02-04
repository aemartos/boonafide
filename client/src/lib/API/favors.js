import { axiosInstance } from '../common/helpers';

export class FavorsAPI {
  static errorHandler(e) {
    console.error(e.response);
    throw e.response;
  }

  static searchBar(){
    return axiosInstance.get('/api/favors/searchBar')
      .then((res) => res.data.favors)
      .catch((e)=> FavorsAPI.errorHandler(e))
  }

  static offerFavors(){
    return axiosInstance.get('/api/favors/offerFavors')
      .then((res) => res.data.favors)
      .catch((e)=> FavorsAPI.errorHandler(e))
  }

  static nearbyFavors(){
    return axiosInstance.get('/api/favors/nearbyFavors')
      .then((res) => res.data.favors)
      .catch((e)=> FavorsAPI.errorHandler(e))
  }
}
