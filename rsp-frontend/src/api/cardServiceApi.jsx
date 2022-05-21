import axios from "axios";

axios.defaults.headers.common['authentication'] = localStorage.getItem('authentication');

//Add card to user
export const addCard = (userId, cardObj) => axios.post(`http://localhost:5006/customers/${userId}/cards`, cardObj);

//Fetch all cards relating to user
export const fetchCards = (userId) => axios.get(`http://localhost:5006/customers/${userId}/cards`);

//Fetch specific card relating to cardId
export const fetchCard = (userId, cardId) => axios.get(`http://localhost:5006/customers/${userId}/cards/${cardId}`);

//Update card details relating to cardId
export const updateCard = (userId, cardId, cardObj) => axios.put(`http://localhost:5006/customers/${userId}/cards/${cardId}`, cardObj);

//Delete the card relating to cardId
export const removeCard = (userId, cardId) => axios.delete(`http://localhost:5006/customers/${userId}/cards/${cardId}`);
