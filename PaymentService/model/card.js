import mongoose from "mongoose";

const cardSchema = new mongoose.Schema({
    cardId:{
        type: String, required: true, unique: true,
    },
    userId:{
        type: String, required: true
    },
    cardType:{
        type: String, required: true
    },
    bankName:{
        type: String, required: true
    },
    cardNo:{
        type: String, required: true
    },
    nameOnCard:{
        type: String, required: true
    },
    validThru:{
        type: Date, required: true
    },
    ccv:{
        type: String, required: true
    }
});

const card = mongoose.model('card', cardSchema);;

export default card;