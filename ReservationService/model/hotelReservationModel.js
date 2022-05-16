import mongoose from "mongoose";
import {v4} from 'uuid';

const hotelReservationInfoSchema = new mongoose.Schema({
    id: {
        type: String,
        default: v4
    },

    hotelName: {
        type: String, 
        required: true,
    },

    hotelRatings: {
        type: String, 
        requried: true,
    },

    hotelAddress: {
        type: String, 
        requried: true,
    },

    hotelContact: {
        type: String, 
        requried: true,
    },

    hotelImage: {
        type: String,
    },

    description: {
        type: String,
    },

    roomPrice: {
        type: Number,
    },

    totalPrice: {
        type: Number,
    },

    availableRooms: {
        type: Number,
        requried: true,
    },

    isHotelAvailable: {
        type: String,
        default: "Available"
    }
});

const hotelReservation = mongoose.model('hotelReservation', hotelReservationInfoSchema);

export default hotelReservation;