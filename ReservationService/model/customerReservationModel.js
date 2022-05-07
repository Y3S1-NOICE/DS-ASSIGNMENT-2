import mongoose from "mongoose";
import hotelSchema from "./hotel.js";
import {v4} from 'uuid';

const customerReservationInfoSchema = new mongoose.Schema({
    id: {
        type: String,
        default: v4
    },

    hotelName: {
        type: String,
        required: true
    },

    reserveeName: {
        type: String,
        required: true
    },

    checkInDate: {
        type: Date, 
        required: true
    },

    checkOutDate: {
        type: Date, 
        required: true
    },

    nightCount: {
        type: Number,
        required: true
    },

    roomCount: {
        type: Number,
        required: true
    },

    adultCount: {
        type: Number,
    },

    childCount: {
        type: Number,
    },
});

const reservation = mongoose.model('customerReservation', customerReservationInfoSchema);

export default reservation;