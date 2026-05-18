import axios from 'axios';

const API_URL = 'http://localhost:5000/api/images';

export const uploadImageAPI = async (file) => {
  const formData = new FormData();
  formData.append('image', file);
  const response = await axios.post(`${API_URL}/upload`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

export const getImagesAPI = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const getImageByIdAPI = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const updateImageAPI = async (id, updatedData) => {
  const response = await axios.put(`${API_URL}/${id}`, updatedData);
  return response.data;
};

export const deleteImageAPI = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
