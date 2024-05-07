const knex = require("knex")(require("../knexfile"));

const getActiveUser = async (req, res) => {
    try {
        const user = await knex("users")
            .where({ id: req.payload.id })
            .first();
            
            res.status(200).json({
                firstName: user.first_name,
                lastName: user.last_name,
                email: user.email,
                id: user.id,
            })
    } catch (error) {
        res.status(500).json({
            message: "Unable to fetch active user data"
        })
    }
};

const getUser = async (req, res) => {
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
        const user = await knex("users")
            .select("id").where({ id: req.params.userId })
            .first();
        
        if(!user) {
            res.status(404).send("User not found");
        }
        
        if(user.id !== req.payload.id) {
            const friendship = await knex("friendships")
            .select("id")
            .where("user1_id", user.id)
            .andWhere("user2_id", req.payload.id)
            .union(knex("friendships")
                .select("status")
                .where("user1_id", req.payload.id)
                .andWhere("user2_id", user.id)
            )
            // .first()
            if(friendship.length === 0) {
                return res.status(403).send("Unauthorized")
            }

            if(friendship.status !== "friends" && user.id !== req.payload.id) {
            }
        }

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

        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({
            message: "Error fetching items for user"
        })
    }
}

module.exports = {
    getActiveUser,
    getUser,
    userItems,
}