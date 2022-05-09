import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:5002/';

export const makeReservation = (payload) => axios.post('customer/reservations', payload);
export const fetchAllReservations = (payload) => axios.get('customer/reservations', payload);
export const updateReservation = (id, payload) => axios.put(`customer/reservations/${id}`, payload);
export const deleteReservation = (id) => axios.delete(`customer/reservations/${id}`);