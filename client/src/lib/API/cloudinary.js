import axios from 'axios';

const service = axios.create({
  //baseURL: process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:5000/api',
  baseURL: 'http://localhost:3001',
  withCredentials: true
})

const errHandler = err => {
  // console.error(err);
  if (err.response && err.response.data) {
    // console.error("API response", err.response.data);
    throw err.response.data.message
  }
  throw err;
}

export const addPicture = (file) => {
  const formData = new FormData();
  formData.append("picture", file);
  return service.post('/api/users/pictures', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then(res => res.data)
    .catch(errHandler);
}
