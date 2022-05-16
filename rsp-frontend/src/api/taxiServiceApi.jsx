import axios from 'axios';

axios.defaults.headers.common['authentication'] = localStorage.getItem('authentication');

export const addTaxi = (payload) => axios.post('http://localhost:5003/taxis', payload);
export const viewAllTaxis = (payload) => axios.get('http://localhost:5003/taxis', payload);
export const updateTaxi = (id, payload) => axios.put(`http://localhost:5003/taxis/${id}`, payload);
export const removeTaxi = (id) => axios.delete(`http://localhost:5003/taxis/${id}`);

export const addCustomer = (payload) => axios.post('http://localhost:5003/customers', payload);
export const viewAllCustomers = (payload) => axios.get('http://localhost:5003/customers', payload);
export const updateCustomer = (id, payload) => axios.put(`http://localhost:5003/customers/${id}`, payload);
export const removeCustomer = (id) => axios.delete(`http://localhost:5003/customers/${id}`);