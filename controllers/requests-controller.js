const knex = require("knex")(require("../knexfile"));

const getRequests = async (req, res) => {
    const userId = req.payload.id;

    try {
        const incomingRequests = await knex("requests")
            .select(
                "requests.id",
                "requests.user1_id",
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
                "requests.id",
                "requests.user1_id",
                "items.title",
                "items.image",
                "users.first_name",
            )
            .join("items", "requests.item_id", "=", "items.id")
            .join("users", "requests.user2_id", "=", "users.id")
            .where("user1_id", userId)
            .andWhere("status", "pending")

        const pastRequests = await knex("requests")
            .select(
                "requests.id",
                "requests.user1_id",
                "items.title",
                "items.image",
                "users.first_name",
            )
            .join("items", "requests.item_id", "=", "items.id")
            .join("users", "requests.user1_id", "=", "users.id")
            .where("user2_id", userId)
            .andWhereNot("status", "pending")
            .union(knex("requests")
                .select(
                    "requests.id",
                    "requests.user1_id",
                    "items.title",
                    "items.image",
                    "users.first_name",
                )
                .join("items", "requests.item_id", "=", "items.id")
                .join("users", "requests.user2_id", "=", "users.id")
                .where("user1_id", userId)
                .andWhereNot("status", "pending")
            )

        const requests = {
            "incoming": incomingRequests,
            "outgoing": outgoingRequests,
            "history": pastRequests,
        }
        
        res.status(200).json(requests)
    } catch (error) {
        res.status(500).json({
            message: "Error fetching user requests"
        })
    }
}

const requestById = async (req,res) => {
    try {
        const request = await knex("requests")
            .select(
                "requests.id",
                "requests.item_id",
                "requests.user1_id",
                "requests.message",
                "requests.status",
                "items.title",
                "items.size",
                "items.image",
                "users.first_name",
            )
            .join("items", "requests.item_id", "=", "items.id")
            .join("users", "requests.user1_id", "=", "users.id")
            .where("requests.id", req.params.requestId)
            .first()
        res.status(201).json(request);

    } catch (error) {
        res.status(500).json({
            message: "Unable to fetch request data"
        })
    }
}

const sendRequest = async (req, res) => {
    const { itemId } = req.params;
    const { user1, user2, message } = req.body;

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
                "message": message,
                "status": "pending",
                "date": Date.now()
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

const cancelRequest = async (req, res) => {
    try {
		const request = await knex("requests")
			.where({ id: req.params.requestId })
			.delete();
		
			if (!request) {
			return res.status(404).json({message: "Request not found"})
		}

		res.status(204).send(`Successfully deleted request: ${req.params.requestId}`)
	} catch (error) {
		res.status(404).send(`Error deleting request: ${error}`);
	}
}

module.exports = {
    getRequests,
    requestById,
    sendRequest,
    cancelRequest,
}