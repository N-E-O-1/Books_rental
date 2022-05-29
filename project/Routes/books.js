const express = require('express')
const {Genre} = require('../model/genres')
const {Book,validate} = require('../model/books')
const router = express.Router()

router.get('/', async (req,res) => {
    const book = await Book.find().sort('name')
    res.send(book)
})
router.post('/', async (req,res) => {
    const {error} = validate(req.body)
    if(!error) return res.status(400).send(error.details[0].message);

    const genre = await Genre.findById(req.body.genreId);
    if(!genre) return res.status(400).send('invalid genre')
    
    const book = new Book({
        title:req.body.title,
        genre:{
            _id:genre._id,
            name:genre.name
        },
        numberInStock:req.body.numberInStock,
        dailyRentalRate:req.body.dailyRentalRate
    })
    await book.save()
    res.send(book)
})

router.put('/:id',async(req,res) => {
    const {error} = validate(req.body)
    if(!error) res.status(404).send(error.details[0].message)

    const genre = await Genre.findById(req.body.genreId)
    if(!genre) return res.status(400).send('invalid genre.')

    const book = Book.findByIdAndUpdate(req.params.id,{
        title:req.body.title,
        genre:{
            _id:genre._id,
            name:genre.name
        },
        numberInStock:req.body.numberInStock,
        dailyRentalRate:req.body.dailyRentalRate
    })
    if(!book) return res.status(404).send('book with given id was not found')
    res.send(book);
})

router.get('/:id',async(req,res) => {
    const book = await Book.findById(req.params.id)
    if(!book) return res.status(404).send('book with given id not found')
    res.send(book)
})

router.delete('/:id',async(req,res) => {
    const book = await Book.findByIdAndRemove(req.params.id)
    if(!book) return res.status(404).send('book with given id not found')

    res.send(book)
})

module.exports = router