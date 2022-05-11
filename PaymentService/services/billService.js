import bill from "../model/bill.js";
import card from "../model/card.js";
import ID from "nodejs-unique-numeric-id-generator";

import { mailOptions, transporter } from "./emailService.js";


//create bill
const createBill = (req, res) =>{
    let billID = ID.generate(new Date().toJSON());
    const newBill = bill({
        billId:billID,
        userId:req.body.userId,
        userName:req.body.userName,
        billDate:req.body.billDate,
        reservationId:req.body.reservationId,
        cardId:req.body.cardId,
        checkoutPrice:req.body.checkoutPrice 
    })
    let status = null;
    if(newBill.cardId){
        const cardFilter = {cardId: newBill.cardId}
        card.findOne(cardFilter, (error, cardDetails) =>{
            if(!cardDetails){
                res.status(404).json("No Registered Card Found!")
            }else if(error){
                res.status(400).json(error);
                status = false;
            }else{
                let message = "The card payment of Rs: " + newBill.checkoutPrice + "/= is completed! Used pre-registered card with ID: " + req.body.cardId;
                newBill.save((error) =>{
                    if(error){
                        res.status(400).json("Payment record unsuccessfull!");
                    }else{
                        let mailOpt = {
                            from:mailOptions.from,
                            to:req.body.email,
                            subject:"Reservation Payment",
                            text:message
                        }
                        transporter.sendMail(mailOpt, function(err, success){
                            err?
                                console.log(err):
                                res.status(201).json(message);
                        })
                    }  
                })
            }       
        });
    }else{
        let message = "";
        if(req.body.cardNo){
            message = "The card payment of Rs: " + newBill.checkoutPrice +"/= is completed! Used Card No.: " + req.body.cardNo;
        }else{
            message = "The cash payment of Rs: " + newBill.checkoutPrice +"/= is completed!";
        }
        newBill.save((error) =>{
            if(error){
                res.status(400).json("Payment record unsuccessfull!");
            }else{
                let mailOpt ={
                    from:mailOptions.from,
                    to:req.body.email,
                    subject:"Reservation Payment",
                    text:message
                }
                transporter.sendMail(mailOpt, function(err, success){
                    err ?
                        console.log(err):
                        res.status(201).json(message);
                })
            }
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