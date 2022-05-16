import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDatabase from "./database/connection.js";
import {addTaxi, viewAllTaxis, viewATaxi, updateTaxi, removeTaxi} from "./services/taxiService.js";
import { addCustomer, viewACustomer, viewAllCustomers, updateCustomer,removeCustomer } from "./services/customerService.js";
import {roles} from "./utils/utilities.js"
import { authenticate, authorize } from "./middleware/auth.js";
const { ADMIN, CUSTOMER } = roles;

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

app.post('/taxis', authorize(ADMIN), addTaxi);
app.get('/taxis', authorize(ADMIN, CUSTOMER), viewAllTaxis);
app.get('/taxis/:id', authorize(ADMIN, CUSTOMER), viewATaxi);
app.put('/taxis/:id', authorize(ADMIN), updateTaxi);
app.delete('/taxis/:id', authorize(ADMIN), removeTaxi);

app.post('/customers', authorize(CUSTOMER), addCustomer);
app.get('/customers', authorize(CUSTOMER, ADMIN), viewAllCustomers);
app.get('/customers/:id', authorize(ADMIN), viewACustomer);
app.put('/customers/:id', authorize(ADMIN), updateCustomer);
app.delete('/customers/:id', authorize(CUSTOMER, ADMIN), removeCustomer);

app.listen(process.env.PORT, () =>{
    console.log(`Server is running on port ${PORT}`);
});