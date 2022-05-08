import taxi from "../model/taxi.js";

//Add a taxi
const addTaxi = (req, res) => {
    const newTaxi = taxi(req.body);
    newTaxi.save((error) =>{
        error ?
            res.status(400).json(error) :
            res.status(201).json(newTaxi);
    })
}

//View taxis
const viewAllTaxis = (req, res) =>{
    taxi.find((error, taxiDetails) =>{
        !taxiDetails ?
            res.status(404).json('No taxis found'):
            error ?
                res.status(400).json(error) :
                res.status(200).json(taxiDetails);
    })
}

//fetch a specific taxi
const viewATaxi = (req, res) =>{
    const filter = {id: req.params.id};
    taxi.findOne(filter, (error, taxiDetails) =>{
        !taxiDetails ?
            res.status(404).json("Taxi not found!") :
            error?
                res.status(400).json(error):
                res.status(200).json(taxiDetails)
    })
};

//update taxi
const updateTaxi = (req, res) =>{
    const filter = {id: req.params.id};
    const updatedTaxiDetails = {
        vehicleType: req.body.vehicleType,
        vehicleNo: req.body.vehicleNo,
        driverName: req.body.driverName,
        contacNumber: req.body.contacNumber,
    }
    taxi.findOneAndUpdate(filter, updatedTaxiDetails, (error, taxiDetails) =>{
        !taxiDetails ?
            res.status(404).json("Taxi not found!"):
            error ?
                res.status(400).json(error):
                res.status(200).json(updatedTaxiDetails)
    })
}

//Remove taxi
const removeTaxi = (req, res) =>{
    const filter = {id:req.params.id};
    taxi.findOneAndDelete(filter, (error, taxiDetails) =>{
        !taxiDetails ?
            res.status(404).json("Taxi not found!"):
            error ?
                res.status(400).json(error):
                res.status(204).json("Taxi Details removed from profile!")
    })
}

export {addTaxi, viewAllTaxis, viewATaxi, updateTaxi, removeTaxi};