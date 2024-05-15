require('dotenv').config();
const bcrypt = require('bcrypt');
const SEED_PASSWORD = process.env.SEED_PASSWORD;


exports.seed = async function(knex) {
  const hash = await bcrypt.hash(SEED_PASSWORD, 10);

  await knex("users").del()
  await knex("users").insert([
    {
      first_name:"Jane",
      last_name:"Sample",
      email:"jane.sample@email.com",
      password: hash,
    },
    {
      first_name:"Misty",
      last_name:"Copeland",
      email:"m.copeland@email.com",
      password: hash,
    },
    {
      first_name:"Evelyn",
      last_name:"Buffalo-Robe",
      email:"amelia.e@email.com",
      password: hash,
    },
    {
      first_name:"Zhenyi",
      last_name:"Wang",
      email:"wangzy@email.com",
      password: hash,
    },
    {
      first_name:"Grace",
      last_name:"Hopper",
      email:"g.hopper@email.com",
      password: hash,
    },
  ]);
};