//send sms message
export const sendSms = (req, res) =>{
    let smsObj = {
        from:req.body.from,
        to:req.body.to,
        subject:req.body.subject,
        message:req.body.message
    }
        res.status(200).json(smsObj)
}