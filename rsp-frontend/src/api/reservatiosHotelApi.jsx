import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:5002/';

export const createReservation = (payload) => axios.post('admin/reservations', payload);
export const getAllReservations = (payload) => axios.get('admin/reservations', payload);
export const updateReservation = (id, payload) => axios.put(`admin/reservations/${id}`, payload);
export const deleteReservation = (id) => axios.delete(`admin/reservations/${id}`);