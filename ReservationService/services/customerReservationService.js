import customerReservation from "../model/customerReservationModel.js";

//Add
const addCustomerReservation = (req, res) => {
    const newReservation = customerReservation(req.body);
    newReservation.save((error) =>{
        error ?
            res.status(400).json(error) :
            res.status(201).json(newReservation);
    })
}

//View
const getAllCustomerReservations = (req, res) =>{
    customerReservation.find((error, reservationDetails) =>{
        !reservationDetails ?
            res.status(404).json('No reservations found'):
            error ?
                res.status(400).json(error) :
                res.status(200).json(reservationDetails);
    })
}

//fetch ome
const getACustomerReservation = (req, res) =>{
    const filter = {id: req.params.id};
    customerReservation.findOne(filter, (error, reservationDetails) =>{
        !reservationDetails ?
            res.status(404).json(`No Reservation Found for ${id}`) :
            error?
                res.status(400).json(error):
                res.status(200).json(reservationDetails)
    })
};

//update
const updateCustomerReservation = (req, res) =>{
    const filter = {id: req.params.id};
    const updatedReservationDetails = {
        hotelName: req.body.hotelName,
        reserveeName: req.body.reserveeName,
        contact: req.body.contact,
        email: req.body.email,
        checkInDate: req.body.checkInDate,
        checkOutDate: req.body.checkOutDate,
        nightCount: req.body.nightCount,
        roomCount: req.body.roomCount,
        adultCount: req.body.adultCount,
        totalPrice: req.body.totalPrice,
        childCount: req.body.childCount
    }
    customerReservation.findOneAndUpdate(filter, updatedReservationDetails, (error, reservationDetails) =>{
        !reservationDetails ?
            res.status(404).json(`No Reservation Found for ${id}`):
            error ?
                res.status(400).json(error):
                res.status(200).json(updatedReservationDetails)
    })
}

//Remove
const removeCustomerReservation = (req, res) =>{
    const filter = {id:req.params.id};
    customerReservation.findOneAndDelete(filter, (error, reservationDetails) =>{
        !reservationDetails ?
            res.status(404).json('No Reservation Found'):
            error ?
                res.status(400).json(error):
                res.status(204).json('Reservation successfully removed!')
    })
}

export {
    addCustomerReservation, 
    getAllCustomerReservations, 
    getACustomerReservation, 
    updateCustomerReservation, 
    removeCustomerReservation
};