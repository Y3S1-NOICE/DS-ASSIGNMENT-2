import axios from "axios";

axios.defaults.headers.common['authentication'] = localStorage.getItem('authentication');

//Create and send an sms for the payment
export const sendSms = (smsObj) => axios.post(`http://localhost:5005/sms`, smsObj);