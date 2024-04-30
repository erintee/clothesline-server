const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;

const verifyToken = (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401)
    }
    const token = authorization.split(' ')[1];
    console.log(token)
    
    if (!token) {
        return res.sendStatus(401);
    }

    try {
        const payload = jwt.verify(token, SECRET_KEY);
        console.log(payload);
        
        req.payload = payload;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).send("Invalid token");
    }
}

module.exports = {
    verifyToken,
}