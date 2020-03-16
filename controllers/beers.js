const express = require('express')
const beer = express.Router()
const Beer = require('../models/beer.js')





/**********************INDEX ROUTE**************************************/

beer.get('/', (req,res) => {
  Beer.find({}, (error,foundBeers) => {
    if (error) {
      res.status(400).json({error: error.message})
    }
    res.status(200).json(foundBeers)
  })
})





/*********************Create Route******************/

beer.post('/', async (req, res) => {
  Beer.create(req.body, (error, createdBeer) => {
    if (error) {
      res.status(400).json({ error: error.message})
    }
    res.status(200).json(createdBeer)
  })
})






/**********************DELETE ROUTE***************************************/

beer.delete('/:id', (req, res) => {
  Beer.findByIdAndRemove(req.params.id, (error, deletedBeer) => {
    if (error) {
      res.status(400).json({ error: error.message})
    }
    res.status(200).json(deletedBeer)
  })
})





/*********************UPDATE ROUTE******************************************/


beer.put('/:id', (req, res) => {
  Beer.findByIdAndUpdate(req.params.id, req.body, {new:true}, (error, updatedBeer) => {
    if (error) {
      res.status(400).json({ error: error.message})
    }
    res.status(200).json(updatedBeer)
  })
})







module.exports = beer
