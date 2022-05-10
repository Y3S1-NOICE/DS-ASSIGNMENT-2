import axios from 'axios';

// axios.defaults.baseURL = 'http://localhost:5000';
axios.defaults.headers.common['authentication'] = localStorage.getItem('authentication');

export const login = (payload) => axios.post('http://localhost:5000/users/login', payload);
export const fetchUsers = (queryParams) => axios.get(`http://localhost:5000/users${queryParams}`);
export const createUser = (payload) => axios.post('http://localhost:5000/users', payload);
export const updateUser = (id, payload) => axios.put(`http://localhost:5000/users/${id}`, payload);
export const deleteUser = (id) => axios.delete(`http://localhost:5000/users/${id}`);