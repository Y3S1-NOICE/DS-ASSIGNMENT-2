import mongoose from "mongoose";

const reservationSchema = new mongoose.Schema({
    roomId:{
        type: String, required: true,
    },
    roomPrice:{
        type: String, required: true
    },
    nights:{
        type: Number, required: true
    }
})

export default reservationSchema;