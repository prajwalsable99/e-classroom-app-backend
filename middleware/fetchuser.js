const jwt=require('jsonwebtoken');

const seckey=require('../routes/auth');
const JWT_TOKEN_SEC_KEY="PrajwaLSable";


const fetchUser = (req,res,next)=>{

    console.log("\n middleware\n")
    const token=req.header('auth-token');
    if(!token){

        res.status(401).send({error :"access denied"});
        
    }
    try {
        
        const verTok=jwt.verify(token,JWT_TOKEN_SEC_KEY);
        req.user=verTok.user;
        next();
    } catch (error) {
        res.status(500).send("ivalid token");
    }
    console.log("\n middleware end\n")
}
module.exports=fetchUser;