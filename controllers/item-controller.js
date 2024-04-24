const knex = require('knex')(require("../knexfile"));

const allItems = async (_req, res) => {
    try {
        const items = await knex("items")
            .select(
                "items.type",
                "items.colour",
                "items.size",
                "items.image",
                "users.name"            
            )
            .join("users", "items.user_id", "=", "users.id");

        res.status(200).json(items);
    } catch (error) {
        res.status(500).send("Error retrieving items:", error);
    }
}

module.exports = {
    allItems
}