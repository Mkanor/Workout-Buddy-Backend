const mongoose = require('mongoose');
const validator = require('validator')
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;
const userSchema = new Schema({
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true}
})

userSchema.statics.signup=async(email,password)=>{
    if(!email || !password){
        throw Error('All Fields must be Filled')
    }
    if(!validator.isEmail(email)){
        throw Error('Email is not valid')
    }
    if(!validator.isStrongPassword(password)){
        throw Error('Password must contain - Special Characters, Numbers, Lower and upper case letters and should be of length 8')
    }
    const exists = await mongoose.model('User',userSchema).findOne({email});
    if(exists){
        throw Error('Email Already in Use');
    }
    if(!exists){
        //use bcrypt(hashinf function) to convert password in a secure way
        //genSalt(10)- generates a randonm string of 10 char
        //hash(password, salt) - joins salt to the password
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password,salt);
        const user = await mongoose.model('User',userSchema).create({email,password:hash})
        return user;
    }
}

userSchema.statics.login=async(email,password)=>{
    if(!email ||!password){
        throw Error('All Fields are required');
    }
    const user = await mongoose.model('User',userSchema).findOne({email});
    if(!user){
        throw Error('Incorrect Email')
    }
    const match = await bcrypt.compare(password,user.password);
    if(!match){
        throw Error('Incorrect password');
    }
    return user;
}

module.exports= mongoose.model('User',userSchema);