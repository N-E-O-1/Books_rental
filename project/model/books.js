const mongoose = require('mongoose')
const Joi = require('joi')
const {genreSchema, Genre} = require('./genres')

const Book = mongoose.model('books',new mongoose.Schema({
    title:{
        type:String,
        minlength:5,
        maxlength:10,
        required:true
    },
    genre:{
        type:genreSchema,
        required:true
    },
    numberInStock:{
        type:Number,
        minlength:0,
        maxlength:255,
        required:true
    },
    dailyRentalRate:{
        type:Number,
        minlength:0,
        maxlength:255,
        required:true
    } 
}))
  async function createBooks(title,genre,numberInStock,dailyRentalRate){
      const book = new Book({
          title,
          genre,
          numberInStock,
          dailyRentalRate
      })
      const result = await book.save()
      console.log(result)
  }
  createBooks('agnibaan',new Genre({name:'Adventure'}),10,1)

function validateBooks(books){
    const schema = Joi.object({
        title:Joi.string().min(5).max(255).required(),
        genreId:Joi.objectId().required(),
        numberInStock:Joi.number().min(0).required(),
        dailyRentalRate:Joi.number().min(0).required()
    })
    return schema.validate(books)
}

exports.Book = Book
exports.validate = validateBooks