import axios from "axios";

axios.defaults.headers.common['authentication'] = localStorage.getItem('authentication');

//Generate bill for payment
export const createBill = (userId, billObj) => axios.post(`http://localhost:5001/customers/${userId}/payments`, billObj);

//Fetch all Bills
export const fetchBills = () => axios.get(`http://localhost:5001/bills`);

//Fetch specific bill relating to billId
export const fetchBill = (billId) => axios.get(`http://localhost:5001/bills/${billId}`);

//Delete bill relating to billId
export const removeBills = (billId) => axios.delete(`http://localhost:5001/bills/${billId}`);