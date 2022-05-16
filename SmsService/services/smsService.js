//send sms message
export const sendSms = (req, res) =>{
    let smsObj = {
        from:req.body.from,
        to:req.body.to,
        subject:req.body.subject,
        message:req.body.message
    }
    try{
        res.status(200).json(smsObj)
    }catch(error){
        res.status(400).json(error)
    }
}