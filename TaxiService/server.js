import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDatabase from "./database/connection.js";
import {addTaxi, viewAllTaxis, viewATaxi, updateTaxi, removeTaxi} from "./services/taxiService.js";
import { addCustomer, viewACustomer, viewAllCustomers, updateCustomer,removeCustomer } from "./services/customerService.js";


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


app.post('/taxis', addTaxi);
app.get('/taxis', viewAllTaxis);
app.get('/taxis/:id', viewATaxi);
app.put('/taxis/:id', updateTaxi);
app.delete('/taxis/:id', removeTaxi);

app.post('/customers', addCustomer);
app.get('/customers', viewAllCustomers);
app.get('/customers/:id', viewACustomer);
app.put('/customers/:id', updateCustomer);
app.delete('/customers/:id', removeCustomer);

app.listen(process.env.PORT, () =>{
    console.log(`Server is running on port ${PORT}`);
});
