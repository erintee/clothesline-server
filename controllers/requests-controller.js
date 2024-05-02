const knex = require("knex")(require("../knexfile"));

const getRequests = async (req, res) => {
    const userId = req.params.userId;
    console.log(typeof req.payload.id)

    if (Number(userId) !== req.payload.id) {
        return res.status(403).send("Unauthorized to access request data")
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
            .andWhere("status", "requested")

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
            .andWhere("status", "requested")

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
    const { item } = req.params.itemId;

    // get data for both users
        // user one from token
        // user two by getting item by id and taking the user_id
    // insert record into requests table with two user id's and item id and "pending" as status
    // add date of entry
}

module.exports = {
    getRequests,
    sendRequest
}