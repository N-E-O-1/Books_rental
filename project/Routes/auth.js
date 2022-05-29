const Joi = require('joi')
const bcrypt = require('bcrypt')
const _ = require('lodash')
const {User} = require('../model/user')
const express = require('express')
const router = express.Router()

router.get('/',async(req,res) => {
    const user = await User.find().sort('name')
    res.send(user)
})

router.post('/',async(req,res) => {
    const {error} = validate(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    let user = await User.findOne({email:req.body.email})
    if(!user) return res.status(400).send('invalid user or password')

    const validPassword = await bcrypt.compare(req.body.password,user.password)
    if(!validPassword) return res.status(404).send('invalid email or password')

    const token = user.generateAuthToken()

    res.send(token)
})
function validate(req){
    const schema = Joi.object({
        email:Joi.string().min(5).max(255).required().email(),
        password:Joi.string().min(5).max(255).required(),
    })
    return schema.validate(req)
}

module.exports = router

