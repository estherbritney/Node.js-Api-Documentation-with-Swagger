const jwt =  require('jsonwebtoken');
require('dotenv').config();

 async function Auth(req, res, next){
    try {
        
        // access authorize header to validate request
        const token = req.headers.authorization.split(" ")[1];

        // retrive the user details for the logged in user
        const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);

        req.user = decodedToken;

        next()

    } catch (error) {
        res.status(401).json({ error : "Authentication Failed!"})
    }
}


module.exports = Auth;


// to genetate JWT_SECRET 
// node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"