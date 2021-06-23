const express = require('express')
const router = express.Router()
const Plants = require('../models/plants-model')

router.get('/', async (req, res) => {
    try{
        const dbPlants = await Plants.getPlants()
        res.json(dbPlants)
    } catch (err) {
        console.log(err)
        res.status(500).json({message: 'db error', error: err})
    }
})



module.exports = router