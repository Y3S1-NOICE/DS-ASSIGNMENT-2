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

app.post('/admin/reservations', addHotelReservation);
app.get('/admin/reservations', getAllHotelReservations);
app.get('/admin/reservations/:id', getAHotelReservation);
app.put('/admin/reservations/:id', updateHotelReservation);
app.delete('/admin/reservations/:id', removeHotelReservation);

app.post('/customer/reservations', addCustomerReservation);
app.get('/customer/reservations', getAllCustomerReservations);
app.get('/customer/reservations/:id', getACustomerReservation);
app.put('/customer/reservations/:id', updateCustomerReservation);
app.delete('/customer/reservations/:id', removeCustomerReservation);
app.delete('/updateStatus/:id', updateStatus);

app.listen(process.env.PORT, () =>{
    console.log(`Server is running on port ${PORT}`);
});
