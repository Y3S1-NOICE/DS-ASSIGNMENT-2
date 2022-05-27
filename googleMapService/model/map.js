import mongoose from "mongoose";

const mapSchema = new mongoose.Schema({
    hotelId: {
        type: String
    },
    hotelName: {
        type: String
    },
    lat:{
        type: String, required: true
    },
    lng:{
        type: String, required: true
    }
});

const map = mongoose.model('map', mapSchema);

export default map;