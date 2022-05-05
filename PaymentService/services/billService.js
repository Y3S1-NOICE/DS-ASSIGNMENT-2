import bill from "../model/bill.js";
import card from "../model/card.js";


//create bill
const createBill = (req, res) =>{
    const newBill = bill(req.body);
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
                let message = "The card payment of Rs: " + newBill.checkoutPrice + "/= is completed!";
                newBill.save((error) =>{
                    error ?
                        res.status(400).json("Payment record unsuccessfull!"):
                        res.status(201).json(message);
                })
            }       
        });
    }else{
        let message = "The cash payment of Rs: " + newBill.checkoutPrice +"/= is completed!";
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