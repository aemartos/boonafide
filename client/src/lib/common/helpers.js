import axios from 'axios';
import { errorMessageAction, clearMessages } from '../redux/actions';
import { URL_SERVER } from './constants';

export const timeOutMessages = (dispatch, msg, time = 3000) => {
  dispatch(errorMessageAction(msg));
  setTimeout(() => dispatch(clearMessages()), time);
}

export const axiosInstance = axios.create({
  baseURL: URL_SERVER,
  //baseURL: "http://localhost:3001",
  timeout: 1000,
  withCredentials: true,
  crossDomain: true
});

export const setMarker = (position, marker, map, icon = "/images/marker.png", draggable = false) => {
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

export const getScript = (source, id, callback) => {
  var script = document.createElement('script');
  var prior = document.getElementsByTagName('script')[0];
  script.setAttribute('id', id);
  script.async = 1;
  script.onload = script.onreadystatechange = function( _, isAbort ) {
    if(isAbort || !script.readyState || /loaded|complete/.test(script.readyState) ) {
      script.onload = script.onreadystatechange = null;
      script = undefined;
      if(!isAbort) {if(callback) callback();}
    }
  };
  script.src = source;
  prior.parentNode.insertBefore(script, prior);
}

export const getTime = (date) => {
  const hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();;
  const mins = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
  return hour + ':' + mins;
}

export const getCompleteDate = (date) => {
  const monthNames = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
  ];
  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();
  return day + ' ' + monthNames[monthIndex] + ' ' + year;
}

export const formatDate = (date) => {
  const completeDate = getCompleteDate(date);
  const time = getTime(date);
  return completeDate + ', ' + time;
}
