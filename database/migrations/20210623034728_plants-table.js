
exports.up = function(knex) {
  return knex.schema.createTable('plants', tbl => {
      tbl.increments('id')
      tbl.string('nickname', 128).notNullable()
      tbl.string('species', 128).notNullable()
      tbl.string('h2o_frequency', 128).notNullable()
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('plants')
};
