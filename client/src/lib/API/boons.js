import { axiosInstance } from '../common/helpers';

export class BoonsAPI {
  static errorHandler(e) {
    // console.error(e.response.data);
    throw e.response.data;
  }

  static getTotalBoons() {
    return axiosInstance.get('/api/boons/totalBoons')
      .then((res) => res.data)
      .catch((e) => BoonsAPI.errorHandler(e));
  }

  static redeemBoon() {
    return axiosInstance.post('/api/boons/redeemBoon')
      .then((res) => res.data)
      .catch((e) => BoonsAPI.errorHandler(e));
  }
}
