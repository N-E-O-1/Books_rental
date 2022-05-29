const Joi = require('joi');
const mongoose = require('mongoose');

const Customer = mongoose.model('Customer', new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  isGold: {
    type: Boolean,
    default: false
  },
  phone: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  }
}));
//  async function createCustomer(){
//      const customer = new Customer({
//          name:'Hrishikesh',
//          phone:'12345',
//          isGold:true
//      })
//      try{
//          const result = await customer.save();
//          console.log(result)
//      }
//      catch(ex){
//          console.log(ex.message)
//      }
//  }

function validateCustomer(customer) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    phone: Joi.string().min(5).max(50).required(),
    isGold: Joi.boolean()
  });

  return schema.validate(customer);
}
// createCustomer()
exports.Customer = Customer; 
exports.validate = validateCustomer;