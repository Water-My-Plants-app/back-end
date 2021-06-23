const db = require("../../database/dbConfig");

function getUsers() {
  return db("users").orderBy("id");
}

function getUserById(id) {
  return db("users").where({ id: id }).first();
}

//POST --  /api/auth/register
function addUser(user) {
  return db("users")
    .insert(user, "id")
    .then((ids) => {
      return db("users").where({ id: ids }).first();
    });
}

//POST --  /api/auth/login
function findBy(filter) {
  return db("users").where(filter).orderBy("id").first();
}

module.exports = {
    getUsers,
    getUserById,
    addUser,
    findBy,
  };