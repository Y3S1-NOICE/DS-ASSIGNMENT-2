import mongoose from "mongoose";

const connectDatabase = (databaseUrl) =>{
    mongoose.connect(databaseUrl)//create database connection
        .then((db) => console.log(`Connected to database : ${db.connection.host}`))
        .catch((error) => console.error(`Unable to connect to database : ${error.message}`))
};

export default connectDatabase;