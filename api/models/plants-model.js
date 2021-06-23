const db = require('../../database/dbConfig')

function getPlants(){
    return db('plants')
}

async function addPlant(plant){
    const [id] = await db('plants').insert(plant, 'id')
    return findById(id)
}

async function updatePlant(id, changes){
 await db('plants').where({ id }).update(changes)
 return await findById(id)
}

function findById(id){
    return db('plants')
    .where('id', id)
    .first()
}

async function deletePlant(id) {
    return await db("plants").where('id', id).del()
 }

module.exports = {
    getPlants,
    addPlant,
    findById,
    deletePlant,
    updatePlant
}