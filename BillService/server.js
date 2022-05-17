import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDatabase from "./database/connection.js";
import { createBill, fetchBill, fetchBills, removeBills } from "./services/billService.js";
import { roles } from "./utils/utilities.js";
import { authenticate, authorize } from "./middleware/auth.js";
const {ADMIN, CUSTOMER} = roles;

//Enable .env file
dotenv.config();
const PORT = process.env.PORT;
const DATABASE_URI = process.env.DATABASE_URI;

//Create database connection
connectDatabase(DATABASE_URI); 

const app = express();
app.use(cors({origin:"*"}));

//Let express know to use json for http requests and response.
app.use(express.json());
app.use(authenticate);

app.post('/customers/:userId/bills', authorize(CUSTOMER),createBill);
app.get('/bills', authorize(ADMIN),fetchBills);
app.get('/bills/:billId', authorize(ADMIN),fetchBill);
app.delete('/bills/:billId', authorize(ADMIN),removeBills);

app.listen(process.env.PORT, () =>{
    console.log(`Server is running on port ${PORT}`);
});
