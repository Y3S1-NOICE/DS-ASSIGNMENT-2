import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
    id:{
        type: String, required: true,
    },
    name:{
        type: String, required: true
    },
    vehicleType:{
        type: String, required: true
    },
    driverName:{
        type: String, required: true
    },
    contactNumber:{
        type: String, required: true
    },
    pickUp:{
        type: String, required: true
    },
    dropOff:{
        type: String, required: true
    },

});

const customer = mongoose.model('bookedtaxi', customerSchema);

export default customer;