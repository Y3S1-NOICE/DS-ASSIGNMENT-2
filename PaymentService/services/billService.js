import bill from "../model/bill.js";
import ID from "nodejs-unique-numeric-id-generator";

//create bill
const createBill = (req, res) =>{
    let billID = "B" + ID.generate(new Date().toJSON());
    const newBill = bill({
        billId:billID,
        userId:req.body.userId,
        userName:req.body.userName,
        billDate:req.body.billDate,
        reservationId:req.body.reservationId,
        cardId:req.body.cardId,
        checkoutPrice:req.body.checkoutPrice 
    })
    if(newBill.cardId){ //checks if the new bill has a card ID
        let message = "The card payment of Rs: " + newBill.checkoutPrice + "/= is completed! Used pre-registered card with ID: " + req.body.cardId;
        newBill.save((error) =>{
            error ?
                res.status(400).json("Payment record unsuccessfull!"):
                res.status(201).json(message);
        });
    }else{
        let message = "";
        if(req.body.cardNo){//checks if the request body has a cardNumber
            message = "The card payment of Rs: " + newBill.checkoutPrice +"/= is completed! Used Card No.: " + req.body.cardNo;
        }else{
            message = "The cash payment of Rs: " + newBill.checkoutPrice +"/= is completed!";
        }
        newBill.save((error) =>{
            error ?
                res.status(400).json("Payment record unsuccessfull!"):
                res.status(201).json(message);
        })
    } 
}

//fetchAllBills
const fetchBills = (req, res) =>{
    bill.find((error, billDetails) =>{
        !billDetails ?
            res.status(404).json('No Bills found'):
            error ?
                res.status(400).json(error) :
                res.status(200).json(billDetails);
    })
}

//fetchBill
const fetchBill = (req, res) =>{
    const filter = {billId: req.params.billId};
    bill.findOne(filter, (error, billDetails) =>{
        !billDetails ?
            res.status(404).json('No Bill found'):
            error ?
                res.status(400).json(error) :
                res.status(200).json(billDetails);
    })
}

//removeBills
const removeBills = (req, res) =>{
    const filter = {billId: req.params.billId};
    bill.findOneAndDelete(filter, (error, billDetails) =>{
        !billDetails ?
            res.status(404).json('No Bill found'):
            error ?
                res.status(400).json(error) :
                res.status(204).json("Bill removed");
    })
}

export {createBill, fetchBill, fetchBills, removeBills}