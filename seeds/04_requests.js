exports.seed = async function(knex) {
    // Deletes ALL existing entries
    await knex("requests").del()
    await knex("requests").insert([
      {
        user1_id: 1,
        user2_id: 2,
        item_id: 3,
        message: "Hey Sarah, can I borrow these for a hike on the 12th?",
        status: "pending",
        date: 1714758748000, 
      },
      {
        user1_id: 3,
        user2_id: 1,
        item_id: 1,
        message: "Can I wear this to my office party next week?",
        status: "pending",
        date: 1714499548000,
      },
      {
        user1_id: 3,
        user2_id: 1,
        item_id: 2,
        message: "Hi! Can I borrow these for Sarah's wedding?",
        status: "accepted",
        date: 1706809948000,
      },
    ]);
  };