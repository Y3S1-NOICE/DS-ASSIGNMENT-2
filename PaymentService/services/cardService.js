import card from "../model/card.js";
import ID from "nodejs-unique-numeric-id-generator";

//Add card
const addCard = (req, res) => {
    let cardID = "C" + ID.generate(new Date().toJSON());
    const newCard = card({
        cardId: cardID,
        userId: req.body.userId,
        cardType: req.body.cardType,
        bankName: req.body.bankName,
        cardNo: req.body.cardNo,
        nameOnCard: req.body.nameOnCard,
        validThru: req.body.validThru,
        cvc: req.body.cvc,
        
    })
    newCard.save((error) =>{
        error ?
            res.status(400).json(error) :
            res.status(201).json(newCard);
    })
}

//View cards
const fetchCards = (req, res) =>{
    const filter = {userId: req.params.userId}
    card.find(filter, (error, cardDetails) =>{//fetch all cards relating to the userId
        !cardDetails ?
            res.status(404).json('No cards found'):
            error ?
                res.status(400).json(error) :
                res.status(200).json(cardDetails);
    })
}

//fetchSpecificCard
const fetchCard = (req, res) =>{
    const filter = {cardId: req.params.cardId};
    card.findOne(filter, (error, cardDetails) =>{//fetch the card relating to the cardId
        !cardDetails ?
            res.status(404).json("Card not found!") :
            error?
                res.status(400).json(error):
                res.status(200).json(cardDetails)
    })
};

//updateCard
const updateCard = (req, res) =>{
    const filter = {cardId: req.params.cardId};
    const updatedCardDetails = {
        cardType: req.body.cardType,
        bankName: req.body.bankName,
        cardNo: req.body.cardNo,
        nameOnCard: req.body.nameOnCard,
        validThru: req.body.validThru,
        cvc: req.body.cvc
    }
    card.findOneAndUpdate(filter, updatedCardDetails, (error, cardDetails) =>{//fetch card relating to cardID and add updated details
        !cardDetails ?
            res.status(404).json("Card not found!"):
            error ?
                res.status(400).json(error):
                res.status(200).json(updatedCardDetails)
    })
}

//RemoveCard
const removeCard = (req, res) =>{
    const filter = {cardId:req.params.cardId};
    card.findOneAndDelete(filter, (error, cardDetails) =>{//delete the card relating to the specific cardID
        !cardDetails ?
            res.status(404).json("Card not found!"):
            error ?
                res.status(400).json(error):
                res.status(204).json("Card Details removed from profile!")
    })
}

export {addCard, fetchCards, fetchCard, updateCard, removeCard};