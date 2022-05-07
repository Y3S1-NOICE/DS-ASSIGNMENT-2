import reservation from "../model/customerReservationModel";

//Add
const addCustomerReservation = (req, res) => {
    const newReservation = reservation(req.body);
    newReservation.save((error) =>{
        error ?
            res.status(400).json(error) :
            res.status(201).json(newReservation);
    })
}

//View
const fetchAllCustomerReservations = (req, res) =>{
    const filter = {id: req.params.id}
    reservation.find(filter, (error, reservationDetails) =>{
        !reservationDetails ?
            res.status(404).json('No reservations found'):
            error ?
                res.status(400).json(error) :
                res.status(200).json(reservationDetails);
    })
}

//fetch ome
const fetchACustomerReservation = (req, res) =>{
    const filter = {id: req.params.id};
    reservation.findOne(filter, (error, reservationDetails) =>{
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
        checkInDate: req.body.checkInDate,
        checkOutDate: req.body.checkOutDate,
        nightCount: req.body.nightCount,
        roomCount: req.body.roomCount,
        adultCount: req.body.adultCount,
        childCount: req.body.childCount
    }
    reservation.findOneAndUpdate(filter, updatedReservationDetails, (error, reservationDetails) =>{
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
    reservation.findOneAndDelete(filter, (error, reservationDetails) =>{
        !reservationDetails ?
            res.status(404).json(`No Reservation Found for ${id}`):
            error ?
                res.status(400).json(error):
                res.status(204).json(`Reservation ${id} successfully removed!`)
    })
}

export {
    addCustomerReservation, 
    fetchAllCustomerReservations, 
    fetchACustomerReservation, 
    updateCustomerReservation, 
    removeCustomerReservation
};