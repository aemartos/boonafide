import axios from 'axios';
import { errorMessageAction, clearMessages } from '../redux/actions';

export const timeOutMessages = (dispatch, msg, time = 3000) => {
  dispatch(errorMessageAction(msg));
  setTimeout(() => dispatch(clearMessages()), time);
}

export const axiosInstance = axios.create({
  baseURL: 'http://localhost:3001',
  timeout: 1000,
  withCredentials: true,
  crossDomain: true
});

export const setMarker = (position, marker, map, icon, draggable = false) => {
  if (marker) {
    marker.setMap(null);
  }
  marker = new window.google.maps.Marker({
    title: "Point location",
    position,
    map,
    draggable,
    icon,
    animation: window.google.maps.Animation.DROP
  });
  marker.setMap(map);
  return marker;
}
