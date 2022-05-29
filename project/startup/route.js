const express = require('express')
const genres = require('../Routes/genres')
const customer = require('../Routes/customer')
const books =  require('../Routes/books')
const rental = require('../Routes/rental')
const user = require('../Routes/user')
const auth = require('../Routes/auth')

module.exports = function(app){
    app.use(express.json())
    app.use('/api/genres',genres)
    app.use('/api/customer',customer)
    app.use('/api/books',books)
    app.use('/api/rental',rental)
    app.use('/api/user',user)
    app.use('/api/auth',auth)
}