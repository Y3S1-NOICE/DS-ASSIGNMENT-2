import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDatabase from "./database/connection.js";
import { addCard, fetchCard, fetchCards, removeCard, updateCard } from "./services/cardService.js";
import { createBill, fetchBill, fetchBills, removeBills } from "./services/billService.js";

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

app.post('/users/:userId/cards', addCard);
app.get('/users/:userId/cards', fetchCards);
app.get('/users/:userId/cards/:cardId', fetchCard);
app.put('/users/:userId/cards/:cardId', updateCard);
app.delete('/users/:userId/cards/:cardId', removeCard);

app.post('/users/:userId/payments', createBill);
app.get('/bills', fetchBills);
app.get('/bills/:billId', fetchBill);
app.delete('/bills/:billId', removeBills);

app.listen(process.env.PORT, () =>{
    console.log(`Server is running on port ${PORT}`);
});
