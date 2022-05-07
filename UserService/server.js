import express from "express";
import dotenv from "dotenv";
import cors from 'cors';
import connectDatabase from "./database/connection.js"
import { login, renewAccessToken } from "./services/authenticationService.js";
import { deleteUser, findUsers, registerUser, updateUser } from "./services/userService.js";
import { authenticate } from "./middleware/auth.js";

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

app.post('/users/login', login);
app.get('users/refreshtoken', renewAccessToken);

// app.use(authenticate);

app.get('/users', findUsers);
app.post('/users', registerUser);
app.put('/users/:id', updateUser);
app.delete('/users/:id', deleteUser);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});