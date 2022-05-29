const { Colorizer } = require('logform')
const winston = require('winston')
require('winston-mongodb')
require('express-async-errors')

module.exports = function(){
    winston.add(
        new winston.transports.File({filename:'uncaughtException.log',handleExceptions:true},
        new winston.transports.Console({colorize:true,prettyPrint:true}
            )))

process.on('unhandledRejection',(ex) => {
    throw(ex) 
})

winston.add(new winston.transports.File({filename:'logfile.log'}))
winston.add(new winston.transports.MongoDB({db:'mongodb://localhost/books',level:'info'}))
}