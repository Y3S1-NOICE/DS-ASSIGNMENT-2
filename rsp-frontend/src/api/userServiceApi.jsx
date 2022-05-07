import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:5000';
axios.defaults.headers.common['authentication'] = localStorage.getItem('authentication');

export const login = (payload) => axios.post('users/login', payload);
export const fetchUsers = (queryParams) => axios.get(`users${queryParams}`);
export const createUser = (payload) => axios.post('users', payload);
export const updateUser = (id, payload) => axios.put(`users/${id}`, payload);
export const deleteUser = (id) => axios.delete(`users/${id}`);