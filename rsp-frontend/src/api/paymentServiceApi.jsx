import axios from "axios";

axios.defaults.headers.common['authentication'] = localStorage.getItem('authentication');

//Add card to user
export const addCard = (userId, cardObj) => axios.post(`http://localhost:5001/users/${userId}/cards`, cardObj);

//Fetch all cards relating to user
export const fetchCards = (userId) => axios.get(`http://localhost:5001/users/${userId}/cards`);

//Fetch specific card relating to cardId
export const fetchCard = (userId, cardId) => axios.get(`http://localhost:5001/users/${userId}/cards/${cardId}`);

//Update card details relating to cardId
export const updateCard = (userId, cardId, cardObj) => axios.put(`http://localhost:5001/users/${userId}/cards/${cardId}`, cardObj);

//Delete the card relating to cardId
export const removeCard = (userId, cardId) => axios.delete(`http://localhost:5001/users/${userId}/cards/${cardId}`);

//Generate bill for payment
export const createBill = (userId, billObj) => axios.post(`http://localhost:5001/users/${userId}/payments`, billObj);

//Fetch all Bills
export const fetchBills = () => axios.get(`http://localhost:5001/bills`);

//Fetch specific bill relating to billId
export const fetchBill = (billId) => axios.get(`http://localhost:5001/bills/${billId}`);

//Delete bill relating to billId
export const removeBills = (billId) => axios.delete(`http://localhost:5001/bills/${billId}`);