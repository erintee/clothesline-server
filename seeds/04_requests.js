exports.seed = async function(knex) {
    // Deletes ALL existing entries
    await knex("requests").del()
    await knex("requests").insert([
      {
        user1_id: 1,
        user2_id: 2,
        item_id: 3,
        status: "pending",
      },
      {
        user1_id: 3,
        user2_id: 1,
        item_id: 1,
        status: "pending",
      },
      {
        user1_id: 3,
        user2_id: 1,
        item_id: 2,
        status: "accepted",
      },
    ]);
  };