//Proceed with the payment
export const makePayment = (req, res) =>{
    let paymentObj={
        cardId: req.body.cardId,
        checkoutPrice:req.body.checkoutPrice
    }
    if(paymentObj.cardId){ //checks if the new bill has a card ID
        let message = "The card payment of Rs: " + paymentObj.checkoutPrice + "/= is completed! Used pre-registered card with ID: " + req.body.cardId;
        res.status(201).json(message)
    }else{
        let message = "";
        if(req.body.cardNo){//checks if the request body has a cardNumber
            message = "The card payment of Rs: " + paymentObj.checkoutPrice +"/= is completed! Used Card No.: " + req.body.cardNo;
        }else{
            message = "The cash payment of Rs: " + paymentObj.checkoutPrice +"/= is completed!";
        }
        res.status(201).json(message);
    } 
}
    