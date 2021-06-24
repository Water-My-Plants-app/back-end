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

router.get('/:id', async (req,res) => {
    const { id } = req.params
    try{
        const plant = await Plants.findById(id)
        if (plant) {
            res.json(plant)
        }else {
            res.status(404).json({message: "invalid id"})
        }
    }catch (err) {
        console.log(err)
        res.status(500).json({message: 'db error', error: err})
    }
})

router.post('/', async (req,res) => {
    const { nickname, species, h2oFrequency } = req.body
    try{
        const plants = await Plants.addPlant({ nickname, species, h2oFrequency })
       res.json(plants)
    } catch(err) {
        console.log(err)
        res.status(500).json({message: 'db error', error: err})
    }
})

router.put('/:id', async (req,res) => {
    const {id} = req.params
    const changes = req.body

    try{
        const changePlant = await Plants.updatePlant(id, changes)
        if(changePlant) {
            res.json(changePlant)
        } else {
            res.status(404).json({message: 'invalid id'})
        }
    } catch(err) {
        console.log(err)
        res.status(500).json({message: 'db error', error: err})
    }
})

router.delete('/:id', async (req, res) => {
    const { id } = req.params

    try{
        const deletePlants = await Plants.deletePlant(id)
        if(deletePlants) {
            res.json({message: "plant deleted"})
        } else {
            res.status(404).json({message: "invalid id"})
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({message: 'db error', error: err})
    }
})

module.exports = router