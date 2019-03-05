import axios from 'axios';
import { URL_SERVER } from '../common/constants';

const service = axios.create({
  baseURL: URL_SERVER,
  withCredentials: true,
});

const errHandler = (err) => {
  // console.error(err);
  if (err.response && err.response.data) {
    // console.error("API response", err.response.data);
    throw err.response.data.message;
  }
  throw err;
};

export const addProfilePicture = (file) => {
  const formData = new FormData();
  formData.append('picture', file);
  return service.post('/api/users/pictures', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
    .then(res => res.data)
    .catch(errHandler);
};

export const addFavorPictures = (files) => {
  const formData = new FormData();
  files.forEach(f => formData.append('picture', f));
  return service.post('/api/favors/pictures', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
    .then(res => res.data)
    .catch(errHandler);
};
