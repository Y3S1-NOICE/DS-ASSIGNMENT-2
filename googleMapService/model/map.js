import mongoose from "mongoose";

const mapSchema = new mongoose.Schema({
    lat:{
        type: String, required: true
    },
    lng:{
        type: String, required: true
    }
});

const map = mongoose.model('map', mapSchema);;

export default map;