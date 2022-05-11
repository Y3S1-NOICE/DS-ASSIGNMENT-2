import axios from "axios";

axios.defaults.headers.common['authentication'] = localStorage.getItem('authentication');

export const addCard = (userId, cardObj) => axios.post(`http://localhost:5001/users/${userId}/cards`, cardObj);
export const fetchCards = (userId) => axios.get(`http://localhost:5001/users/${userId}/cards`);
export const fetchCard = (userId, cardId) => axios.get(`http://localhost:5001/users/${userId}/cards/${cardId}`);
export const updateCard = (userId, cardId, cardObj) => axios.put(`http://localhost:5001/users/${userId}/cards/${cardId}`, cardObj);
export const removeCard = (userId, cardId) => axios.delete(`http://localhost:5001/users/${userId}/cards/${cardId}`);

export const createBill = (userId, billObj) => axios.post(`http://localhost:5001/users/${userId}/payments`, billObj);
export const fetchBills = () => axios.get(`http://localhost:5001/bills`);
export const fetchBill = (billId) => axios.get(`http://localhost:5001/bills/${billId}`);
export const removeBills = (billId) => axios.delete(`http://localhost:5001/bills/${billId}`);