
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('plants').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('plants').insert([
        {
          nickname: 'Ageratum',
          species: 'Asteraceae',
          h2o_frequency: 'daily',
      },
      {
          nickname: 'American Marigold',
          species: 'Asteraceae',
          h2o_frequency: 'twice weekly',
      },
      {
          nickname: 'Bleeding Heart',
          species: 'Perennial',
          h2o_frequency: 'weekly',
      },
      {
          nickname: 'Blue Sage',
          species: 'Lamiaceae',
          h2o_frequency: 'twice weekly',
      },
      {
          nickname: 'Canna Lily',
          species: 'Cannaceae',
          h2o_frequency: 'hourly',
      },
      {
          nickname: 'Gazania',
          species: 'Asteraceae',
          h2o_frequency: 'weekly',
      },
      {
          nickname: 'Japanese Iris',
          species: 'Iridaceae',
          h2o_frequency: 'daily',
      },
      {
          nickname: 'Lilac',
          species: 'Oleaceae',
          h2o_frequency: 'twice monthly',
       },
      ]);
    });
};
