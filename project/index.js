const error = require('./middleware/error')
const express = require('express')
const app = express()

require('./startup/logging')
require('./startup/route')(app)
require('./startup/db')()
require('./startup/config')()
require('./startup/validation')()
require('./startup/prod')(app)

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));