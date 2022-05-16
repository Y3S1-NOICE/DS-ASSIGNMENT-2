import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDatabase from "./database/connection.js";
import { 
    addHotelReservation, 
    getAllHotelReservations,
    getAHotelReservation,
    updateHotelReservation, 
    removeHotelReservation
} from "./services/hotelReservationService.js";
import { 
    addCustomerReservation, 
    getAllCustomerReservations, 
    getACustomerReservation, 
    updateCustomerReservation, 
    removeCustomerReservation,
    updateStatus
} from "./services/customerReservationService.js";

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

app.post('/admin/reservations', authorize(ADMIN), addHotelReservation);
app.get('/admin/reservations', authorize(ADMIN), getAllHotelReservations);
app.get('/admin/reservations/:id', authorize(ADMIN), getAHotelReservation);
app.put('/admin/reservations/:id', authorize(ADMIN), updateHotelReservation);
app.delete('/admin/reservations/:id', authorize(ADMIN), removeHotelReservation);

app.post('/customer/reservations', authorize(CUSTOMER), addCustomerReservation);
app.get('/customer/reservations', authorize(CUSTOMER, ADMIN),getAllCustomerReservations);
app.get('/customer/reservations/:id', authorize(CUSTOMER),getACustomerReservation);
app.put('/customer/reservations/:id', authorize(CUSTOMER),updateCustomerReservation);
app.delete('/customer/reservations/:id', authorize(CUSTOMER),removeCustomerReservation);
app.put('/updateStatus/:id', authorize(ADMIN), updateStatus);

app.listen(process.env.PORT, () =>{
    console.log(`Server is running on port ${PORT}`);
});
