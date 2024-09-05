// import jwt from "jsonwebtoken";

// export const verifyToken = (req, res, next) => {
//     const token = req.cookies.token;

//    if(!token) return res.status(401).json({ message: "You're not Authenticated"});

//    jwt.verify(token, process.env.JWT_SECRET_KEY, async(error, payload) => {
//     if(error) return res.status(403).json({ message: "Invalid Token"});
//     req.userId = payload.id;
//    })

//    next();
// }

import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    const token = req.cookies.token;
    //const token = req.headers.authorization?.split(' ')[1];  // Extract Bearer token from Authorization header

    if (!token) {
        return res.status(401).json({ message: "You're not authenticated" });
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY, (error, payload) => {
        if (error) {
            return res.status(403).json({ message: "Invalid token" });
        }
        console.log(payload.id);
        req.userId = payload.id;

        next(); // Call next() only after successful verification
    });
};