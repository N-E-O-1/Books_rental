const auth = require('../middleware/auth')
const admin = require('../middleware/admin')
const _ = require('lodash')
const {Genre, validate} = require('../model/genres');
const express = require('express');
const router = express.Router();

router.get('/',async (req, res) => {
    const genres = await Genre.find().sort('name');
    res.send(genres);
});

router.post('/',auth,async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const genre = new Genre(_.pick(req.body,['name']));
  await genre.save();
  
  res.send(genre);
});

router.put('/:id',async(req,res) => {
    const {error} = validate(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    const genre = await Genre.findByIdAndUpdate(req.params.id,{name:req.body.name},{
        new:true
    })
    if(!genre) return res.status(404).send('genre with given id was not found')
    res.send(genre)
})

router.delete('/:id',[auth,admin],async(req,res) => {
    const genre = await Genre.findByIdAndRemove(req.params.id)
    if(!genre) return res.status(404).send('genre with given id was not found')
    res.send(genre)
})
router.get('/:id',async(req,res) => {
    const genre = await Genre.findById(req.params.id)
    if(!genre) return res.status(404).send('genre with given id was not found')
}) 

module.exports = router