import axios from 'axios';

//axios.defaults.baseURL = 'http://localhost:5002/';
axios.defaults.headers.common['authentication'] = localStorage.getItem('authentication');

export const createReservation = (payload) => axios.post('http://localhost:5002/admin/reservations', payload);
export const getAllReservations = (payload) => axios.get('http://localhost:5002/admin/reservations', payload);
export const updateReservation = (id, payload) => axios.put(`http://localhost:5002/admin/reservations/${id}`, payload);
export const deleteReservation = (id) => axios.delete(`http://localhost:5002/admin/reservations/${id}`);