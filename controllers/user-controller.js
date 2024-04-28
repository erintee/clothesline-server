const knex = require("knex")(require("../knexfile"));

const getUser = async (req, res) => {
    console.log(req);
    try {
        const user = await knex("users")
            .select(
                "first_name",
                "last_name"
            )
            .where({ id: req.params.userId })
            .first();

            res.status(200).json(user);
    } catch (error) {
        res.status(400).send("User not found");
    }
}

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
    getUser,
    userItems,
}