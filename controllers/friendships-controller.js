const knex = require("knex")(require("../knexfile"));

const requestFriend = async (req, res) => {
    try {
        const activeUser = req.payload.id;

        // Check for existing user id
        const id = req.body.userId;
        const user2 =  await knex("users")
            .where({ id })
            .first()

        if(!user2){
            return res.status(404).json({
                message: `User with id ${user2} not found.`
            })
        }

        // Check for existing friendship or friendship request
        // If requesting user has previously declined incoming request, they may make a new one
        const existingFriendship = await knex("friendships")
            .select()
            .where({user1_id: activeUser})
            .andWhere({user2_id: user2.id})
            .union(knex("friendships")
                    .select()
                    .where({user1_id: user2.id})
                    .andWhere({user2_id: activeUser})
                    .andWhereNot({status: "declined"})
            )

        if(existingFriendship.length > 0) {
            return res.status(400).json({
                message: "Friendship record already exists"
            })
        }

        // Insert new request
        const result = await knex
            .insert({
                user1_id: req.payload.id,
                user2_id: user2.id,
                status: "requested",
            })
            .into("friendships")
        
        
        // Fetch newly-created request
        const [requestId] = result;
        const newRequest = await knex("friendships")
            .where({id: requestId})
            .first()

        res.status(201).json(newRequest)
    } catch (error) {
        res.status(500)
    }
}

const getFriendshipRequests = async (req, res) => {
    try {
        const activeUser = req.payload.id;

        const outgoing = await knex("friendships")
            .select(
                "friendships.id",
                {user_id: "friendships.user2_id"},
                "users.first_name",
            )
            .join("users", "friendships.user2_id", "=", "users.id")
            .where("user1_id", activeUser)
            .andWhere("status", "requested")

        const incoming = await knex("friendships")
            .select(
                "friendships.id",
                {user_id: "friendships.user1_id"},
                "users.first_name",
            )
            .join("users", "friendships.user1_id", "=", "users.id")
            .where("user2_id", activeUser)
            .andWhere("status", "requested")

        const friends = await knex("friendships")
            .select(
                "friendships.id",
                {user_id: "friendships.user1_id"},
                "users.first_name",
            )
            .join("users", "friendships.user1_id", "=", "users.id")
            .where("user2_id", activeUser)
            .andWhere("status", "friends")
            .union(knex("friendships")
                .select(
                    "friendships.id",
                    {user_id: "friendships.user2_id"},
                    "users.first_name",
                )
                .join("users", "friendships.user2_id", "=", "users.id")
                .where("user1_id", activeUser)
                .andWhere("status", "friends")
            )

        const friendships = {
            "outgoing": outgoing,
            "incoming": incoming,
            "friends": friends,
        }
        res.status(200).json(friendships)

    } catch (error) {
        res.status(500).json({
            message: "Unable to fetch friendship requests"
        })
    }
}

const respondFriendship = async (req, res) => {
    try {
        const { friendshipId } = req.params;
        const activeUser = req.payload.id;

        const request = await knex("friendships")
            .where({ id: friendshipId})
            .first()

        if (!request) {
            res.status(404).json({
                message: `No friendship request found with id: ${friendshipId}`
            })
        }

        if (request.user2_id !== activeUser) {
            res.status(401).json({
                message: "Unauthorized"
            })
        }

        const response = await knex("friendships")
            .where({ id: friendshipId })
            .update(req.body)

        const updatedFriendship = await knex("friendships")
            .where({ id: friendshipId })
            .first();
        
        res.status(200).json(updatedFriendship);

    } catch (error) {
        res.status(500).json({
            message: "Error updating friendship"
        })
    }
}

const deleteFriendship = async (req, res) => {
    try {
        const { friendshipId } = req.params;
        const activeUser = req.payload.id;

        const record = await knex("friendships")
            .where({ id: friendshipId })
            .first();
        
        if (!record) {
            return res.status(404).json({
                message: `No record found with id ${friendshipId}.`
            })
        };

        const authorized = 
            (record.user2_id === activeUser) || 
            (record.user1_id === activeUser && record.status !== "declined");

        if (!authorized) {
            return res.status(401).json({
                message: "Unauthorized"
            })
        };

        const toDelete = await knex("friendships")
            .where({ id: friendshipId })
            .delete();
    
        res.status(200).json({
            message: "Friendship record successfully deleted."
        })

    } catch (error) {
        res.status(500).json({
            message: "Unable to delete friendship record."
        })
    }
}

module.exports = {
    requestFriend,
    getFriendshipRequests,
    respondFriendship,
    deleteFriendship,
}