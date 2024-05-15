exports.seed = async function(knex) {
    await knex("request_messages").del()
    await knex("request_messages").insert([
        {
            request_id: 1,
            user_id: 1,
            message: "Hey Misty, can I borrow this for a hike onthe 20th?",
            sent_at: "2024-04-10 15:33:35",
        },
        {
            request_id: 1,
            user_id: 2,
            message: "Sure, can you come by Thursday night to pick them up?",
            sent_at: "2024-04-10 19:33:35",
        },
        {
            request_id: 1,
            user_id: 1,
            message: "Yup, sounds good. I'll drop by around 8pm.",
            sent_at: "2024-04-10 19:55:35",
        },
        {
            request_id: 2,
            user_id: 1,
            message: "Evelyn do you mind if I borrow this next week?",
            sent_at: "2024-04-30 17:52:28",
        },
        {
            request_id: 2,
            user_id: 3,
            message: "Sorry! I'm out of town and not back til the 9th.",
            sent_at: "2024-04-30 17:55:35",
        },
        {
            request_id: 2,
            user_id: 1,
            message: "No worries!",
            sent_at: "2024-04-30 18:15:35",
        },
        {
            request_id: 3,
            user_id: 3,
            message: "Hi! Can I borrow these for Sam's wedding?",
            sent_at: "2024-05-01 22:15:35",
        },
    ]);
};