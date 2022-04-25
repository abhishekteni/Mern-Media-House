const jwttoken = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");


// Verify Token
const verify = asyncHandler(async (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers["x-access-token"];

    if(!token) {
        return res.status(403).send("A token is required for authentication");
    }

    try {
        const decoded = jwttoken.verify(token,process.env.JWT_KEY);
        req.user =  decoded;
    } catch (error) {
        return res.status(401).send("Invalid Token");
    }

    return next();
});


module.exports = verify