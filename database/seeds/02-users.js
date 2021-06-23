
exports.seed = function (knex) {
  return knex("users").insert([
    { username: "first_user", password: "first_user_test" },
  ]);
};