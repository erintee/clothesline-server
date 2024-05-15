exports.seed = async function(knex) {
    await knex("requests").del()
    await knex("requests").insert([
      {
        user1_id: 1,
        user2_id: 2,
        item_id: 4,
        request_start: "2024-04-20",
        request_end: "2024-04-21",
        status: "accepted",
      },
      {
        user1_id: 1,
        user2_id: 3,
        item_id: 8,
        request_start: "2024-05-06",
        request_end: "2024-05-08",
        status: "declined",
      },
      {
        user1_id: 3,
        user2_id: 1,
        item_id: 2,
        request_start: "2024-05-25",
        request_end: "2024-05-26",
        status: "pending",
      },
    ]);
  };