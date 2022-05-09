import axios from "axios";

axios.defaults.baseURL = "http://localhost:5001";
axios.defaults.headers.common['authentication'] = localStorage.getItem('authentication');

export const addCard = (userId, cardObj) => axios.post(`/users/${userId}/cards`, cardObj);
export const fetchCards = (userId) => axios.get(`/users/${userId}/cards`);
export const fetchCard = (userId, cardId) => axios.get(`/users/${userId}/cards/${cardId}`);
export const updateCard = (userId, cardId, cardObj) => axios.put(`/users/${userId}/cards/${cardId}`, cardObj);
export const removeCard = (userId, cardId) => axios.delete(`/users/${userId}/cards/${cardId}`);

export const createBill = (userId, billObj) => axios.post(`/users/${userId}/payments`, billObj);
export const fetchBills = () => axios.get(`/bills`);
export const fetchBill = (billId) => axios.get(`/bills/${billId}`);
export const removeBills = (billId) => axios.delete(`/bills/${billId}`);