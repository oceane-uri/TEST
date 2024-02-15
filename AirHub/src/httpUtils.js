// httpUtils.js

import axios from 'axios';
import {
  getAuthToken
} from './authService';

export const secureRequest = async (url, method, data) => {
  const authToken = getAuthToken();

  try {
    const response = await axios({
      method: method,
      url: url,
      data: data,
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};
