import jwt from 'jsonwebtoken';


const userAuth = async (req, res, next) => {
    const {token} = req.headers;

    if (!token) {
        return res.json({ success: false, message: 'No token provided' });
    }
    try{
        const tokenDecode = jwt.verify(token,process.env.JWT_SECRET);
        
        
        if(tokenDecode.id){
            req.body.userId = tokenDecode.id;
        }else{
            return res.json({ success: false, message: 'Not authorized. login again' });
        }
        
        next();
    }catch(error) {
        // console.log("SECRET:", process.env.JWT_SECRET);
        res.json({ success: false, message: 'Invalid token sorry' });
    }
};

export default userAuth;