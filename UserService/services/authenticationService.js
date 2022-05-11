import user from "../model/user.js";
import jwt from "jsonwebtoken";

const login = (req, res) => {
    const { email, password } = req.body;
    const filter = { email, password };

    user.find(filter, (error, users) => {
        if (error) {
            return res.status(500)
                .json(error);

        } else if (users.length > 0){
            const { id, role } = users[0];
            const authBody = { id, role };
            const accessToken = jwt.sign(authBody, process.env.ACCESS_SECRET);
            const refreshToken = jwt.sign(authBody, process.env.REFRESH_SECRET);
            res.status(200).json({isSuccessful:true, accessToken: accessToken, refreshToken: refreshToken});
        } else {
            res.status(401).json('invalid credentials');
        }
    });
}

const renewAccessToken = (req, res) => {
    const { refreshToken } = req.headers;
    if(!refreshToken) return res.status(401).json('No refresh token!');

    jwt.verify(refreshToken, process.env.REFRESH_SECRET, (error, value) => {
        if (error) return res.status(401).json('Invalid refresh token!');
        const accessToken = jwt.sign(authBody, process.env.ACCESS_SECRET, { expiresIn: '1h' });
        res.status(200).json({accessToken: accessToken});
    });
}

export { login, renewAccessToken };