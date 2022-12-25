import axios from 'axios';

//base url to make requests to the database
const instances = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

export default instances;
