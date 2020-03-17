/******************************************************************************
                            DEPENDENCIES
******************************************************************************/

const express = require('express')
const cors = require('cors')
const app = express()
const PORT = process.env.PORT || 3003
const mongoose = require('mongoose')
const beerController = require('./controllers/beers.js')
const mongoConnect = process.env.MONGODB_URI || 'mongodb://localhost:27017/beers'


/*****************************************************************************
                              MIDDLEWARE
******************************************************************************/

app.use(express.json())
const whitelist = ['http://localhost:3000', 'https://cheers-frontend.herokuapp.com', 'https://cheers-backend.herokuapp.com']
const corsOptions = {
  origin: function(origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

app.use(cors(corsOptions))

/******************************************************************************
                        MONGOOSE CONNECTION
******************************************************************************/

mongoose.connection.on('error', error => {console.log(error.message + 'remember to run mongo or something')})
mongoose.connection.on('disconnected', () => console.log('we are disconnected'))

mongoose.connect(mongoConnect, {useUnifiedTopology:true, useNewUrlParser: true})

mongoose.connection.once('open', () => {
  console.log('connected to mongoose');
})


/******************************************************************************
                          ROUTES - BELOW
*******************************************************************************/

app.use('/beers', beerController)





/******************************************************************************
                          LISTENER
*******************************************************************************/
app.listen(PORT, () => {
    console.log('Listening on port: ', PORT);
})
