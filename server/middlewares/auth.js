// import jwt from 'jsonwebtoken';


// const userAuth = async (req, res, next) => {
//     const {token} = req.headers;

//     if (!token) {
//         return res.json({ success: false, message: 'No token provided' });
//     }
//     try{
//         const tokenDecode = jwt.verify(token,process.env.JWT_SECRET);
        
        
//         if(tokenDecode.id){
//             req.body.userId = tokenDecode.id;
//         }else{
//             return res.json({success: false, message: 'Not authorized. login again' });
//         }
        
//         next();
//     }catch(error) {
//         // console.log("SECRET:", process.env.JWT_SECRET);
//         res.json({ success: false, message: 'Invalid token sorry' });
//     }
// };

// export default userAuth;

import jwt from "jsonwebtoken";

const userAuth = async (req, res, next) => {
    try {
        const token = req.headers.token || req.headers.authorization?.split(" ")[1];

        if(!token) {
            return res.json({ success: false, message: "No token provided" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded.id) {
            return res.json({ success: false, message: "Invalid token structure" });
        }

        req.body.userId = decoded.id;
        next();
    }catch (error) {
        console.log("JWT error:", error.message);
        return res.json({ success: false, message: "Invalid token" });
    }
};

export default userAuth;
