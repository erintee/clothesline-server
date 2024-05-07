exports.seed = async function(knex) {
    // Deletes ALL existing entries
    await knex("requests").del()
    await knex("requests").insert([
      {
        user1_id: 1,
        user2_id: 2,
        item_id: 4,
        message: "Hey Misty, can I borrow these for a hike on the 12th?",
        status: "pending",
        date: 1714758748000, 
      },
      {
        user1_id: 1,
        user2_id: 3,
        item_id: 8,
        message: "Evelyn do you mind if I borrow this again? It fit so well last time.",
        status: "pending",
        date: 1714499548000,
      },
      {
        user1_id: 3,
        user2_id: 1,
        item_id: 2,
        message: "Hi! Can I borrow these for Sam's wedding?",
        status: "accepted",
        date: 1706809948000,
      },
      {
        user1_id: 3,
        user2_id: 1,
        item_id: 3,
        message: "Ooh can I please take this next weekend to Whistler?",
        status: "pending",
        date: 1706809948000,
      },
      {
        user1_id: 1,
        user2_id: 5,
        item_id: 14,
        message: "This is so pretty! Mind if I borrow next Friday?",
        status: "accepted",
        date: 1706809948000,
      },
      {
        user1_id: 1,
        user2_id: 5,
        item_id: 12,
        message: "Hey, can I take this on my SF trip next month?",
        status: "declined",
        date: 1714499548000,
      },
    ]);
  };