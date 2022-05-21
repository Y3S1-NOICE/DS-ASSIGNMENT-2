import { decodeJwt } from "../utils/utilities.js";
import jwt from "jsonwebtoken";

const authorize = (...eligibleRoles) => {
    return (req, res, next) => {
        const { role } = decodeJwt(req.headers.authentication);
        if (!eligibleRoles.includes(role)) return res.status(403)
            .json('Unauthorized request!');
        next();
    }
}

const authenticate = (req, res, next) => {
    const { authentication } = req.headers;
    if(!authentication) return res.status(401)
        .json('No access token found in the request header!');
              
    jwt.verify(authentication, process.env.ACCESS_SECRET, (error, value) => {
        if (error) return res.status(401).json('Invalid access token!') 
        next();
    });
}

export {authenticate, authorize};