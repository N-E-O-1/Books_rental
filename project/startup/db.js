const mongoose = require('mongoose')

const dbUrl = "mongodb+srv://admin:admin@vidly1.smvy1.mongodb.net/?retryWrites=true&w=majority"
const connectionParams = {
    useUnifiedTopology:true,
}

module.exports = function(){
    mongoose.connect(dbUrl,connectionParams)
    .then(() => console.log('connected to mongodb....'))
} 