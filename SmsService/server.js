import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { sendSms } from "./services/smsService.js"

//Enable .env file
dotenv.config();
const PORT = process.env.PORT;

const app = express();
app.use(cors({origin:"*"}));

//Let express know to use json for http requests and response.
app.use(express.json());

app.post('/sms', sendSms);

app.listen(process.env.PORT, () =>{
    console.log(`Server is running on port ${PORT}`);
});
