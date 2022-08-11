import axios from 'axios';
import { errorMessageAction, clearMessages } from '../redux/actions';
import { URL_SERVER } from './constants';

export const timeOutMessages = (dispatch, msg, time = 3000) => {
  dispatch(errorMessageAction(msg));
  setTimeout(() => dispatch(clearMessages()), time);
};

export const axiosInstance = axios.create({
  baseURL: URL_SERVER,
  timeout: 1000 * 5, // Wait for 5 seconds
  withCredentials: true,
  crossDomain: true,
});

export const setMarker = (position, marker, map, icon = '/images/marker.png', draggable = false) => {
  if (marker) {
    marker.setMap(null);
  }
  const newMarker = new window.google.maps.Marker({
    title: 'Point location',
    position,
    map,
    draggable,
    icon,
    animation: window.google.maps.Animation.DROP,
  });
  newMarker.setMap(map);
  return newMarker;
};

export const getScript = (source, id, callback) => {
  let script = document.createElement('script');
  const prior = document.getElementsByTagName('script')[0];

  const callbackFunction = (_, isAbort) => {
    if (isAbort || !script.readyState || /loaded|complete/.test(script.readyState)) {
      script.onload = null;
      script.onreadystatechange = null;
      script = undefined;
      if (!isAbort) { if (callback) callback(); }
    }
  };
  script.setAttribute('id', id);
  script.async = 1;
  script.onload = callbackFunction;
  script.onreadystatechange = callbackFunction;
  script.src = source;
  prior.parentNode.insertBefore(script, prior);
};

export const getTime = (date) => {
  const hour = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
  const mins = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
  return `${hour}:${mins}`;
};

export const getCompleteDate = (date) => {
  const monthNames = [
    'January', 'February', 'March',
    'April', 'May', 'June', 'July',
    'August', 'September', 'October',
    'November', 'December',
  ];
  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();
  return `${day} ${monthNames[monthIndex]} ${year}`;
};

export const getCompleteDateMin = (date) => {
  const monthNames = [
    'Jan', 'Feb', 'Mar',
    'Apr', 'May', 'Jun', 'Jul',
    'Aug', 'Sep', 'Oct',
    'Nov', 'Dec',
  ];
  const day = date.getDate();
  const monthIndex = date.getMonth();
  return `${day} ${monthNames[monthIndex]}`;
};

export const formatDate = (date) => {
  const completeDate = getCompleteDate(date);
  const time = getTime(date);
  return `${completeDate}, ${time}`;
};

export const formatDateMin = (date) => {
  const completeDate = getCompleteDateMin(date);
  const time = getTime(date);
  return `${completeDate}, ${time}`;
};
