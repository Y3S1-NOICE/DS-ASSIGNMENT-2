import axios from 'axios';

// axios.defaults.baseURL = 'http://localhost:5002/';
axios.defaults.headers.common['authentication'] = localStorage.getItem('authentication');

export const makeReservation = (payload) => axios.post('http://localhost:5002/customer/reservations', payload);
export const fetchAllReservations = (payload) => axios.get('http://localhost:5002/customer/reservations', payload);
export const fetchReservation = (userId) => axios.get(`http://localhost:5002/customer/reservations/${userId}`);
export const updateReservation = (id, payload) => axios.put(`http://localhost:5002/customer/reservations/${id}`, payload);
export const deleteReservation = (id) => axios.delete(`http://localhost:5002/customer/reservations/${id}`);