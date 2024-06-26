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
            .select("status")
            .where("user1_id", user.id)
            .andWhere("user2_id", req.payload.id)
            .union(knex("friendships")
                .select("status")
                .where("user1_id", req.payload.id)
                .andWhere("user2_id", user.id)
            )
            .first();
            
            if(friendship.length === 0) {
                return res.status(403).send("Unauthorized")
            } else if (friendship.status !== "friends") {
                return res.status(401).send("It's this")
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

const searchUsers = async (req, res) => {
    const { email } = req.params;

    try {
        const foundUser = await knex("users")
            .select(
                "first_name",
                "email",
                "id",
            )
            .where("users.email", email)
            .andWhereNot("id", req.payload.id)
            .first()
        
        if (!foundUser) {
            return res.status(404).json({
                message: `Unable to find user with email: ${email}.`
            })
        }

        const friends = await knex("friendships")
            .select("status")
            .where("user1_id", foundUser.id)
            .andWhere("user2_id", req.payload.id)
            .union(knex("friendships")
                .select("status")
                .where("user1_id", req.payload.id)
                .andWhere("user2_id", foundUser.id)
            )
            .first()
        
        if (friends) {
            foundUser.status = friends.status;
        } else {
            foundUser.status = "new"
        }

        res.status(200).json(foundUser)
    } catch (error) {
        res.status(500).json({
            message: "Unable to search for user"
        })
    }
}

module.exports = {
    getActiveUser,
    getUser,
    userItems,
    searchUsers,
}