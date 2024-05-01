exports.seed = async function(knex) {
    // Deletes ALL existing entries
    await knex("friendships").del()
    await knex("friendships").insert([
      {
        user1_id: 1,
        user2_id: 2,
        status: "friends",
      },
      {
        user1_id: 1,
        user2_id: 3,
        status: "friends",
      },
      {
        user1_id: 1,
        user2_id: 4,
        status: "friends",
      },
      {
        user1_id: 1,
        user2_id: 5,
        status: "friends",
      },
      {
        user1_id: 2,
        user2_id: 3,
        status: "friends",
      },
      {
        user1_id: 2,
        user2_id: 5,
        status: "friends",
      },
      {
        user1_id: 2,
        user2_id: 4,
        status: "requested",
      },
    ]);
  };