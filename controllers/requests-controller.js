const knex = require("knex")(require("../knexfile"));

const getRequests = async (req, res) => {
    const userId = req.params.userId;

    if (Number(userId) !== req.payload.id) {
        return res.status(403).json({
            message: "Unauthorized to access request data"
        });
    }

    try {
        const incomingRequests = await knex("requests")
            .select(
                "requests.item_id",
                "items.title",
                "items.image",
                "users.first_name",
            )
            .join("items", "requests.item_id", "=", "items.id")
            .join("users", "requests.user1_id", "=", "users.id")
            .where("user2_id", userId)
            .andWhere("status", "pending")

        const outgoingRequests = await knex("requests")
            .select(
                "requests.item_id",
                "items.title",
                "items.image",
                "users.first_name",
            )
            .join("items", "requests.item_id", "=", "items.id")
            .join("users", "requests.user2_id", "=", "users.id")
            .where("user1_id", userId)
            .andWhere("status", "pending")

        const acceptedInRequests = await knex("requests")
            .select(
                    "requests.item_id",
                    "items.title",
                    "items.image",
                    "users.first_name",
                )
            .join("items", "requests.item_id", "=", "items.id")
            .join("users", "requests.user2_id", "=", "users.id")
            .where("user1_id", userId)
            .andWhere("status", "accepted")

        const acceptedOutRequests = await knex("requests")
            .select(
                    "requests.item_id",
                    "items.title",
                    "items.image",
                    "users.first_name",
                )
            .join("items", "requests.item_id", "=", "items.id")
            .join("users", "requests.user2_id", "=", "users.id")
            .where("user2_id", userId)
            .andWhere("status", "accepted")

        const requests = {
            "incoming": incomingRequests,
            "outgoing": outgoingRequests,
            "accepted_incoming": acceptedInRequests,
            "accepted_outgoing": acceptedOutRequests,
        }
        
        res.status(200).json(requests)
    } catch (error) {
        res.status(500).json({
            message: "Error fetching user requests"
        })
    }
}

const sendRequest = async (req, res) => {
    const { itemId } = req.params;
    const user1 = req.payload.id;
    const { user2 } = req.body;

    if (!user1 || !user2 || !itemId ) {
        return res.status(400).json({
            message: "Missing user or item data"
        })
    }
    
    try {
        const result = await knex("requests")
            .insert({
                "user1_id": user1,
                "user2_id": user2,
                "item_id": itemId,
                "status": "pending"
            })

        const [ id ] = result;

        const newRequest = await knex("requests")
            .where({ id })
            .first()

        res.status(201).json(newRequest);
    } catch (error) {
        res.status(500).json({
            message: `Unable to make request: ${error}`,
        });
    }
}

module.exports = {
    getRequests,
    sendRequest
}