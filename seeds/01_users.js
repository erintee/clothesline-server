exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex("users").del()
  await knex("users").insert([
    {
      first_name:"Erin",
      last_name:"Templeton",
      email:"erindtempleton@gmail.com",
      password:"123456"
    },
    {
      first_name:"Sarah",
      last_name:"Ehl",
      email:"sarah.e@email.com",
      password:"123456"
    },
    {
      first_name:"Victoria",
      last_name:"Wilcott",
      email:"victoria@email.com",
      password:"123456"
    },
    {
      first_name:"Kelcey",
      last_name:"Hung",
      email:"kelcey25@email.com",
      password:"123456"
    },
    {
      first_name:"Kelsi",
      last_name:"Wall",
      email:"k.wall@email.com",
      password:"123456"
    },
  ]);
};