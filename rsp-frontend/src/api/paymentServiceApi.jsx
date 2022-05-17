import axios from "axios";

axios.defaults.headers.common['authentication'] = localStorage.getItem('authentication');

//Initiate the payment
export const makePayment = (userId, paymentObj) => axios.post(`http://localhost:5001/customers/${userId}/payments`, paymentObj);