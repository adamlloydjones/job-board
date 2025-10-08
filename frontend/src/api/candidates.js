import axios from 'axios';

const API_URL = 'http://localhost:5000/candidates';

export const createCandidate = (data) => axios.post(API_URL, data);
export const searchCandidates = (query) =>
  axios.get(`${API_URL}/search?q=${encodeURIComponent(query)}`);
