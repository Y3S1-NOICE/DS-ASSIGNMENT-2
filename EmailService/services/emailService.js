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

const createEmail = (req, res) =>{
    let mailOpt ={
        from:mailOptions.from,
        to:req.body.email,
        subject:req.body.subject,
        text:req.body.message
    }
    transporter.sendMail(mailOpt, function(err, success){
        err ?
            console.log(err):
            res.status(201).json(success);
    })
}

export {transporter, mailOptions, createEmail}


