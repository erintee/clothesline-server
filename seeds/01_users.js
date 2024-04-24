exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex("users").del()
  await knex("users").insert([
    {
      id:"599e382f-dfec-469a-8ff5-342f5b2767b1",
      username:"erintee",
      name:"Erin",
      email:"erindtempleton@gmail.com",
      password:"123456"
    },
    {
      id:"e6272fe0-94ef-416e-bc6c-be38317754f8",
      username:"se2024",
      name:"Sarah",
      email:"sarah.e@email.com",
      password:"123456"
    },
    {
      id:"5cc3463f-42fc-44b2-86b8-33016eacfa5d",
      username:"vicky01",
      name:"Victoria",
      email:"victoria@email.com",
      password:"123456"
    },
    {
      id:"78397302-5c72-42e4-a0f4-0337433cb5c7",
      username:"khung",
      name:"Kelcey",
      email:"kelcey25@email.com",
      password:"123456"
    },
    {
      id:"c1e22735-e900-41a2-af95-4fcf4dfd3225",
      username:"kelsi",
      name:"Kelsi",
      email:"k.wall@email.com",
      password:"123456"
    },
  ]);
};