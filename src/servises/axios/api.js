import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

export const get = async (url, config = {}) => {
  try {
    const response = await axios.get(url, config);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const post = async (url, payload, config) => {
  try {
    const response = await axios.post(url, payload, config);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const del = async (url, config = {}) => {
  try {
    const response = await axios.delete(url, config);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const put = async (url, payload, config) => {
  try {
    const response = await axios.put(url, payload, config);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};