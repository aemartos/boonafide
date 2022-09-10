import { axiosInstance } from '../common/helpers';

export class FavorsAPI {
  static errorHandler(e) {
    // console.error(e.response);
    throw e.response;
  }

  static getFavors() {
    return axiosInstance.get('/api/favors/allFavors')
      .then((res) => res.data.favors)
      .catch((e) => FavorsAPI.errorHandler(e));
  }

  static getFavorSearch(query) {
    return axiosInstance.get(`/api/favors/search?query=${query}`)
      .then((res) => res.data.favors)
      .catch((e) => FavorsAPI.errorHandler(e));
  }

  static offerFavors() {
    return axiosInstance.get('/api/favors/offerFavors')
      .then((res) => res.data.favors)
      .catch((e) => FavorsAPI.errorHandler(e));
  }

  static nearbyFavors() {
    return axiosInstance.get('/api/favors/nearbyFavors')
      .then((res) => res.data.favors)
      .catch((e) => FavorsAPI.errorHandler(e));
  }

  static getFavor(id) {
    return axiosInstance.get(`/api/favors/${id}`)
      .then((res) => res.data)
      .catch((e) => FavorsAPI.errorHandler(e));
  }

  static favFavor(id) {
    return axiosInstance.post(`/api/favors/${id}/favorite`)
      .then((res) => res.data)
      .catch((e) => FavorsAPI.errorHandler(e));
  }

  static createFavor(favor) {
    return axiosInstance.post('/api/favors/newFavor', { favor })
      .then((res) => res.data)
      .catch((e) => FavorsAPI.errorHandler(e));
  }

  static addComment(id, data) {
    return axiosInstance.post(`/api/favors/${id}/addComment`, { data })
      .then((res) => res.data)
      .catch((e) => FavorsAPI.errorHandler(e));
  }
}
