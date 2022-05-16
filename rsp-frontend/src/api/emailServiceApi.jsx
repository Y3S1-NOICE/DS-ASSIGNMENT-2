import axios from "axios";

axios.defaults.headers.common['authentication'] = localStorage.getItem('authentication');

//Create and send an email for the payment
export const createEmail = (emailObj) => axios.post(`http://localhost:5004/emails`, emailObj);