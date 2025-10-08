import axios from 'axios';

const API_URL = 'http://localhost:5000/jobs';

export const fetchJobs = () => axios.get(API_URL);
export const createJob = (data) => axios.post(API_URL, data);

export const searchJobs = (query) =>
  axios.get(`http://localhost:5000/jobs/search?q=${encodeURIComponent(query)}`);
