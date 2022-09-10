import { axiosInstance } from '../common/helpers';

export class NotificationsAPI {
  static errorHandler(e) {
    // console.error('----------> NotificationsAPI', e.response.data);
    throw e.response.data;
  }

  static getNotifications() {
    return axiosInstance.get('/api/notifications/')
      .then((res) => res.data)
      .catch((e) => NotificationsAPI.errorHandler(e));
  }

  static notificationSeen(id) {
    return axiosInstance.post(`/api/notifications/${id}/seen`)
      .then((res) => res.data)
      .catch((e) => NotificationsAPI.errorHandler(e));
  }
}
