exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex("users").del()
  await knex("users").insert([
    {
      first_name:"Jane",
      last_name:"Sample",
      email:"jane.sample@email.com",
      password:"123456"
    },
    {
      first_name:"Misty",
      last_name:"Copeland",
      email:"m.copeland@email.com",
      password:"123456"
    },
    {
      first_name:"Evelyn",
      last_name:"Buffalo-Robe",
      email:"amelia.e@email.com",
      password:"123456"
    },
    {
      first_name:"Zhenyi",
      last_name:"Wang",
      email:"wangzy@email.com",
      password:"123456"
    },
    {
      first_name:"Grace",
      last_name:"Hopper",
      email:"g.hopper@email.com",
      password:"123456"
    },
  ]);
};