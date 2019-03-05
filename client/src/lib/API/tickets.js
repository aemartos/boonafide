import { axiosInstance } from '../common/helpers';

export class TicketsAPI {
  static errorHandler(e) {
    // console.error(e.response.data);
    throw e.response.data;
  }

  static getAllTickets() {
    return axiosInstance.get('/api/tickets/allTickets')
      .then(res => res.data.tickets)
      .catch(e => TicketsAPI.errorHandler(e));
  }

  static getTicket(id) {
    return axiosInstance.get(`/api/tickets/${id}`)
      .then(res => res.data)
      .catch(e => TicketsAPI.errorHandler(e));
  }

  static newTicket(data) {
    return axiosInstance.post('/api/tickets/newTicket', { data })
      .then(res => res.data)
      .catch(e => TicketsAPI.errorHandler(e));
  }

  static validateTicket(id, data) {
    return axiosInstance.post(`/api/tickets/${id}/validate`, { data })
      .then(res => res.data)
      .catch(e => TicketsAPI.errorHandler(e));
  }
}
