import nodemailer from "nodemailer";

//email sender details
const transporter = nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:"reservation.hotel.app@gmail.com",
        pass:"Hotel@123"
    }
})

//mail ootions method
const mailOptions = {
    from:"reservation.hotel.app@gmail.com",
    to:"",
    subject:"",
    text:""
}

export {transporter, mailOptions}


