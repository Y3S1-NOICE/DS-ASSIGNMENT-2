import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDatabase from "./database/connection.js";

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

app.listen(process.env.PORT, () =>{
    console.log(`Server is running on port ${PORT}`);
});
