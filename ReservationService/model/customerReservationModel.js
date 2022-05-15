import mongoose from "mongoose";
import {v4} from 'uuid';

const customerReservationInfoSchema = new mongoose.Schema({
    id: {
        type: String,
        default: v4
    },

    userId: {
        type: String, 
        // required: true
    },

    hotelName: {
        type: String,
        required: true
    },

    reserveeName: {
        type: String,
        required: true
    },

    contact: {
        type: String,
        required: true,
        minlength: 9,
        maxlength: 15,
    },

    email: {
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

    totalPrice: {
        type: Number,
    },
    
    adultCount: {
        type: Number,
    },

    childCount: {
        type: Number,
    },

    status: {
        type: String,
        default:"Reservation Pending"
    },
});

const customerReservation = mongoose.model('customerReservation', customerReservationInfoSchema);

export default customerReservation;