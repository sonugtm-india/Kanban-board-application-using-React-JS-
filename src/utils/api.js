// utils/api.js
import axios from 'axios';

const BASE_URL = 'https://api.quicksell.co/v1/internal/frontend-assignment';

export const fetchTickets = async () => {
  const response = await axios.get(`${BASE_URL}`);
  return response.data.tickets;
};
