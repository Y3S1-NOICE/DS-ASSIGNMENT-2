
const authorize = (...eligibleRoles) => {
    return (req, res, next) => {
        const { role } = decodeJwt(req.headers.accessToken);
        if (!eligibleRoles.includes(role)) return res.status(403)
            .json('Unauthorized request!');
        next();
    }
}

const authenticate = (req, res, next) => {
    const { accessToken } = req.headers;
    if(!accessToken) return res.status(401)
        .json('No access token found in the request header!');
              
    jwt.verify(accessToken, process.env.ACCESS_SECRET, (error, value) => {
        if (error) return res.status(401).json('Invalid access token!') 
        next();
    });
}

export {authenticate, authorize};