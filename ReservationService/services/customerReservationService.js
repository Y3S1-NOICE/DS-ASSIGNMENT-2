import customerReservation from "../model/customerReservationModel.js";

//make a reservation 
const addCustomerReservation = (req, res) => {
    const oneRoomPrice = 5000;
    let totRoomPrice = (oneRoomPrice * req.body.roomCount) * req.body.nightCount; 
    const newReservation = customerReservation(
       {    "userId":req.body.userId,
            "hotelName":req.body.hotelName,
            "reserveeName":req.body.reserveeName,
            "contact":req.body.contact,
            "email":req.body.email,
            "checkInDate":req.body.checkInDate,
            "checkOutDate":req.body.checkOutDate,
            "nightCount":req.body.nightCount,
            "roomCount":req.body.roomCount,
            "totalPrice":totRoomPrice,
            "adultCount":req.body.adultCount,
            "childCount":req.body.childCount
        }
    );
    newReservation.save((error) =>{
        error ?
            res.status(400).json(error) :
            res.status(201).json(newReservation);
    })
}

//View all maked reservations 
const getAllCustomerReservations = (req, res) =>{
    customerReservation.find((error, reservationDetails) =>{
        !reservationDetails ?
            res.status(404).json('No reservations found'):
            error ?
                res.status(400).json(error) :
                res.status(200).json(reservationDetails);
    })
}

//fetch one reservation 
const getACustomerReservation = (req, res) =>{
    const filter = {id: req.params.id};
    customerReservation.findOne(filter, (error, reservationDetails) =>{
        !reservationDetails ?
        res.status(404).json('No Reservation Found') :
            error?
                res.status(400).json(error):
                res.status(200).json(reservationDetails)
    })
};

//update reservation 
const updateCustomerReservation = (req, res) =>{
    const filter = {id: req.params.id};
    const oneRoomPrice = 5000; 
    let totRoomPrice = (oneRoomPrice * req.body.roomCount) * req.body.nightCount;
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
        totalPrice: totRoomPrice,
        childCount: req.body.childCount
    }
    customerReservation.findOneAndUpdate(filter, updatedReservationDetails, (error, reservationDetails) =>{
        !reservationDetails ?
            res.status(404).json('No Reservation Found'):
            error ?
                res.status(400).json(error):
                res.status(200).json(updatedReservationDetails)
    })
}

//Remove a reservation 
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

//update customer status
const updateStatus = (req, res) =>{
    const filter = {id: req.params.id || 'invalidId'};
    const statusDetails = {
        status: req.body.status
    }
    customerReservation.findOneAndUpdate(filter, statusDetails, (error, reservationDetails) =>{
        !reservationDetails ?
        res.status(404).json('No Reservation Found'):
        error?
        res.status(400).json(error):
        res.status(200).json(statusDetails)
    });   
}

export {
    addCustomerReservation, 
    getAllCustomerReservations, 
    getACustomerReservation, 
    updateCustomerReservation, 
    removeCustomerReservation,
    updateStatus
};