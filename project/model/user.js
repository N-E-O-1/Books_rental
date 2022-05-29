const mongoose = require('mongoose')
const Joi = require('joi')
const jwt = require('jsonwebtoken')
const config = require('config')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:5,
        maxlength:255
    },
    email:{
        type:String,
        required:true,
        minlength:5,
        maxlength:255,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minlength:5,
        maxlength:255,

    },
    isAdmin:Boolean
})
userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id:this._id,isAdmin:this.isAdmin },config.get('jwtPrivateKey'))
    return token 
}

const User = mongoose.model('User',userSchema)

function validateUser(user){
    const schema = Joi.object({
        name:Joi.string().min(5).max(255).required(),
        email:Joi.string().min(5).max(255).required().email(),
        password:Joi.string().min(5).max(255).required(),
    })
    return schema.validate(user)
}

module.exports.User = User
module.exports.validate = validateUser