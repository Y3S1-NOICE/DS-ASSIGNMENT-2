import mongoose from "mongoose";

const taxiSchema = new mongoose.Schema({
    id:{
        type: String, required: true, unique: true,
    },
    vehicleType:{
        type: String, required: true
    },
    vehicleNo:{
        type: String, required: true
    },
    driverName:{
        type: String, required: true
    },
    contacNumber:{
        type: String, required: true
    },

});

const taxi = mongoose.model('taxi', taxiSchema);;

export default taxi;