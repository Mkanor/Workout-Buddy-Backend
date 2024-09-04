const jwt = require('jsonwebtoken');
const UserModel = require('../models/userModels');
const requireAuth=async(req,res,next)=>{
    const {authorization} = req.headers;
    if(!authorization){
        return res.status(401).json({error:'authorization token is required'})
    }
    //authorization = "Bearer ajkshjfk.jhghj.sjsdg"
    const token = authorization.split(' ')[1];
    try{
    const {_id}=jwt.verify(token,process.env.SECRET_CODE);
    req.user = await UserModel.findOne({_id}).select('_id')
    next();
    }catch(err){
        res.status(401).json({error:'req is not authorised'})
    }    
    
}
module.exports = requireAuth;