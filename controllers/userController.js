const UserModel = require('../models/userModels');
const jwt = require('jsonwebtoken');

const createToken=(_id)=>{
    return jwt.sign({_id:_id},process.env.SECRET_CODE,{expiresIn:'3d'})
}

const loginUser=async(req,res)=>{
    const {email,password} = req.body;
    try{
        const user = await UserModel.login(email,password);
        const token = createToken(user._id)
        res.status(200).json({email,token})

    }catch(err){
        res.status(400).json({error:err.message});

    }
}
const signupUser=async(req,res)=>{
   const {email,password} = req.body;
   try{
        const user = await UserModel.signup(email,password);
        const token = createToken(user._id);
        res.status(200).json({email,token});
   }catch(err){
    res.status(400).json({error:err.message});

   }
}

module.exports={signupUser,loginUser};