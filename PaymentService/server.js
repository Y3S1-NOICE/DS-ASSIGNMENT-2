import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { roles } from "./utils/utilities.js";
import { authenticate, authorize } from "./middleware/auth.js";
import { makePayment } from "./services/paymentService.js";
const { CUSTOMER } = roles;

//Enable .env file
dotenv.config();
const PORT = process.env.PORT;

const app = express();
app.use(cors({origin:"*"}));

//Let express know to use json for http requests and response.
app.use(express.json());
app.use(authenticate);

app.post('/customers/:userId/payments', authorize(CUSTOMER),makePayment);

app.listen(process.env.PORT, () =>{
    console.log(`Server is running on port ${PORT}`);
});
