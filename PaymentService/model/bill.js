import mongoose from "mongoose";

const billSchema = new mongoose.Schema({
    billId:{
        type: String, required: true
    },
    userId:{
        type: String, required: true
    },
    userName:{
        type: String, required: true
    },
    billDate:{
        type: Date, required: true
    },
    reservationId:{
        type: String, required: true
    },
    cardId:{
        type:String,
    },
    checkoutPrice:{
        type: String, required: true
    }
})

const bill = mongoose.model('bill', billSchema);

export default bill;