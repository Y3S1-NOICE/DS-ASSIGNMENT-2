import customer from "../model/customer.js";

//Add a customer
const addCustomer = (req, res) => {
    const newCustomer = customer(req.body);
    newCustomer.save((error) =>{
        error ?
            res.status(400).json(error) :
            res.status(201).json(newCustomer);
    })
}

//View customers
const viewAllCustomers = (req, res) =>{
    customer.find((error, customerDetails) =>{
        !customerDetails ?
            res.status(404).json('No customers found'):
            error ?
                res.status(400).json(error) :
                res.status(200).json(customerDetails);
    })
}

//fetch a specific customer
const viewACustomer = (req, res) =>{
    const filter = {id: req.params.id};
    customer.findOne(filter, (error, customerDetails) =>{
        !customerDetails ?
            res.status(404).json("Customer not found!") :
            error?
                res.status(400).json(error):
                res.status(200).json(customerDetails)
    })
};


//update customer
const updateCustomer = (req, res) =>{
    const filter = {id: req.params.id};
    const updatedCustomerDetails = {
        name:req.body.name,
        vehicleType: req.body.vehicleType,
        contactNumber: req.body.contactNumber,
        pickUp: req.body.pickUp,
        dropOff: req.body.dropOff,
    }
    customer.findOneAndUpdate(filter, updatedCustomerDetails, (error, customerDetails) =>{
        !customerDetails ?
            res.status(404).json("Customer not found!"):
            error ?
                res.status(400).json(error):
                res.status(200).json(updatedCustomerDetails)
    })
}

//Remove customer
const removeCustomer = (req, res) =>{
    const filter = {id:req.params.id};
    customer.findOneAndDelete(filter, (error, customerDetails) =>{
        !customerDetails ?
            res.status(404).json("Customer not found!"):
            error ?
                res.status(400).json(error):
                res.status(204).json("Customer Details removed from profile!")
    })
}

export {addCustomer,viewAllCustomers,viewACustomer,updateCustomer,removeCustomer}; 