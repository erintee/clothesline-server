const knex = require("knex")(require("../knexfile"));

const userItems = async (req, res) => {
    try {
        const items = await knex("items")
            .select(
                "id",
                "title",
                "type",
                "colour",
                "size",
                "image",
            )
            .where({ user_id: req.params.userId });

        const user = await knex("users")
            .select("id").where({ id: req.params.userId })
            .first();
        
        if(!user) {
            res.status(404).send("User not found");
        }

        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({
            message: "Error fetching items for user"
        })
    }
}

module.exports = {
    userItems,
}