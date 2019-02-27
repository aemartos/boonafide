import { axiosInstance } from '../common/helpers';

export class MessagesAPI {
  static errorHandler(e) {
    //console.error(e.response.data);
    throw e.response.data;
  }
  static disconnect() {
    return axiosInstance.post(`/api/messages/disconnect`);
  }
  static getConversations(){
    return axiosInstance.get(`/api/messages/conversations`)
      .then((res) => res.data)
      .catch((e)=> MessagesAPI.errorHandler(e))
  }
  static getMessages(id){
    return axiosInstance.get(`/api/messages/${id}`)
      .then((res) => res.data)
      .catch((e)=> MessagesAPI.errorHandler(e))
  }
  static moreMessages(id, offset){
    return axiosInstance.get(`/api/messages/getAllMessagesFrom/${id}?offset=${offset}`)
      .then((res) => res.data)
      .catch((e)=> MessagesAPI.errorHandler(e))
  }
}
