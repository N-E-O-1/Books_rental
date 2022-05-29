const {Rental,validate} = require('../model/rental')
const {Book} = require('../model/books')
const {Customer} = require('../model/customer')
const express = require('express')
const router = express.Router()

router.get('/',async(req,res) => {
    const rental = await Rental.find().sort('-dateOut')
    res.send(rental)
})

router.post('/',async(req,res) => {
    const {error} = validate(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    const customer = await Customer.findById(req.body.customerId)
    if(!customer) return res.status(400).send('invalid Customer')

    const book = await Book.findById(req.body.bookId)
    if(!book) return res.status(400).send('invalid book')

    if(book.numberInStock === 0)return res.status(400).send('book not in stock')
    
    let rental = new Rental({
        customer:{
            _id:customer._id,
            name:customer.name,
            phone:customer.phone
        },
        book:{
            _id:book._id,
            title:book.title,
            dailyRentalRate:book.dailyRentalRate
        }
    })
    rental = await rental.save()

    book.numberInStock--;
    book.save();

    res.send(rental)
})

module.exports = router

