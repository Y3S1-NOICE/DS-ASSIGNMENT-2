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
        cardNo:req.body.cardNo,
        checkoutPrice:req.body.checkoutPrice 
    })
    newBill.save((error) =>{
        error ?
            res.status(400).json("Bill Creation unsuccessful!"):
            res.status(201).json("Bill creation successful!");
    })
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