import hotelReservation from "../model/hotelReservationModel.js";

//Add
const addHotelReservation = (req, res) => {
    const newReservation = hotelReservation(req.body);
    newReservation.save((error) =>{
        error ?
            res.status(400).json(error) :
            res.status(201).json(newReservation);
    })
}

//View
const fetchAllHotelReservations = (req, res) =>{
    const filter = {id: req.params.id}
    hotelReservation.find(filter, (error, reservationDetails) =>{
        !reservationDetails ?
            res.status(404).json('No reservations found'):
            error ?
                res.status(400).json(error) :
                res.status(200).json(reservationDetails);
    })
}

//fetch ome
const fetchAHotelReservation = (req, res) =>{
    const filter = {id: req.params.id};
    hotelReservation.findOne(filter, (error, reservationDetails) =>{
        !reservationDetails ?
            res.status(404).json(`No Reservation Found for ${id}`) :
            error?
                res.status(400).json(error):
                res.status(200).json(reservationDetails)
    })
};

//update
const updateHotelReservation = (req, res) =>{
    const filter = {id: req.params.id};
    const updatedReservationDetails = {
        hotelName: req.body.hotelName,
        hotelRatings: req.body.hotelRatings,
        hotelAddress: req.body.hotelAddress,
        hotelContact: req.body.hotelContact,
        hotelImage: req.body.hotelImage,
        description: req.body.description,
        roomPrice: req.body.roomPrice,
        servicePrice: req.body.servicePrice,
        taxesAndCharges: req.body.taxesAndCharges,
        availableRooms: req.body.availableRooms,
        isHotelAvailable: req.body.isHotelAvailable
    }
    hotelReservation.findOneAndUpdate(filter, updatedReservationDetails, (error, reservationDetails) =>{
        !reservationDetails ?
            res.status(404).json(`No Reservation Found for ${id}`):
            error ?
                res.status(400).json(error):
                res.status(200).json(updatedReservationDetails)
    })
}

//Remove
const removeHotelReservation = (req, res) =>{
    const filter = {id:req.params.id};
    hotelReservation.findOneAndDelete(filter, (error, reservationDetails) =>{
        !reservationDetails ?
            res.status(404).json(`No Reservation Found for ${id}`):
            error ?
                res.status(400).json(error):
                res.status(204).json(`Reservation ${id} successfully removed!`)
    })
}

export {
    addHotelReservation, 
    fetchAllHotelReservations, 
    fetchAHotelReservation, 
    updateHotelReservation, 
    removeHotelReservation
};