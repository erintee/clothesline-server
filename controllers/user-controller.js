const knex = require("knex")(require("../knexfile"));

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

        // const accessUser = await knex("users")
        //     .select("id").where({ id: req.payload.id })
        //     .first();
        
        // const [{ status }] = await knex("friendships")
        //     .select("status")
        //     .where("user1_id", itemsUser.id)
        //     .andWhere("user2_id", accessUser.id)
        //     .union(knex("friendships")
        //         .select("status")
        //         .where("user1_id", accessUser.id)
        //         .andWhere("user2_id", itemsUser.id)
        //     )
        //     // .first()

        // // if(status !== "friends" && itemsUser.id !== accessUser.id) {
        // //     return res.status(403).send("Unauthorized")
        // // }

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
    getUser,
    userItems,
}