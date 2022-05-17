import express from "express";
import dotenv from "dotenv";
import cors from 'cors';
import connectDatabase from "./database/connection.js"
import { createMap, getMap, updateMap } from "./services/mapService.js";
import { roles } from "./utils/utilities.js";
import { authenticate, authorize } from "./middleware/auth.js";

const { CUSTOMER, SYSTEM_ADMIN, HOTEL_ADMIN } = roles;

// Enable .env file
dotenv.config();
const PORT = process.env.PORT;
const DATABASE_URI = process.env.DATABASE_URI

// Create database connection 
connectDatabase(DATABASE_URI); 

const app = express();
app.use(cors({origin: '*'}));

// Let express know, to use Json for http requests and response.
app.use(express.json());

// Authenticate http requests
app.use(authenticate);

app.post('/map', authorize(SYSTEM_ADMIN, HOTEL_ADMIN), createMap);
app.get('/map', authorize(CUSTOMER, SYSTEM_ADMIN, HOTEL_ADMIN), getMap);
app.put('/map', authorize(SYSTEM_ADMIN, HOTEL_ADMIN), updateMap);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});