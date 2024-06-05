const knex = require("knex")(require("../knexfile"));

const getRequests = async (req, res) => {
    const userId = req.payload.id;

    try {
        const incomingRequests = await knex("requests")
            .select(
                "requests.id",
                "requests.user1_id",
                "requests.request_start",
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
                "requests.request_start",
                "items.title",
                "items.image",
                "users.first_name",
            )
            .join("items", "requests.item_id", "=", "items.id")
            .join("users", "requests.user2_id", "=", "users.id")
            .where("user1_id", userId)
            .andWhere("status", "pending")

        const activeRequests = await knex("requests")
            .select(
                "requests.id",
                "requests.user1_id",
                "requests.request_start",
                "items.title",
                "items.image",
                "users.first_name",
            )
            .join("items", "requests.item_id", "=", "items.id")
            .join("users", "requests.user2_id", "=", "users.id")
            .where("user1_id", userId)
            .andWhere("request_end", ">", new Date())

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
            .andWhere("request_end", "<", new Date())
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
                .andWhere("request_end", "<", new Date())
            )

        const requests = {
            "incoming": incomingRequests,
            "outgoing": outgoingRequests,
            "active": activeRequests,
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
                "requests.request_start",
                "requests.request_end",
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

        if (!request) {
            return res.status(404).json({
                message: `No request found with id: ${request.id}`
            })
        }
        res.status(201).json(request);

    } catch (error) {
        res.status(500).json({
            message: "Unable to fetch request data"
        })
    }
}

const getRequestMessages = async (req,res) => {
    try {
        const {requestId } = req.params;
        const request = await knex("requests")
        .where("requests.id", requestId)
        
        if (!request) {
            return res.status(404).json({
                message: `No request found with id: ${requestId}`
            })
        }

        const messages = await knex("request_messages")
        .select(
            "request_messages.user_id",
            "request_messages.message",
            "request_messages.sent_at",
            "users.first_name",
        )
        .join("users", "request_messages.user_id", "=", "users.id")
        .where("request_messages.request_id", requestId)

        res.status(201).json(messages);
     } catch (error) {
        res.status(500).json({
            message: "Unable to fetch request messages"
        })
     }
}

const sendRequest = async (req, res) => {
    const { itemId } = req.params;
    const { user1, user2, requestStart, requestEnd, message } = req.body;

    if (!user1 || !user2 || !itemId ) {
        return res.status(400).json({
            message: "Missing user or item data"
        })
    }
    
    try {
        await knex.transaction(async (trx) => {
            const requestId = await trx("requests")
                .insert({
                    "requests.user1_id": user1,
                    "requests.user2_id": user2,
                    "requests.item_id": itemId,
                    "requests.request_start": requestStart,
                    "requests.request_end": requestEnd,
                    "requests.status": "pending",
                })

            const [ id ] = requestId;
            
            await trx("request_messages")
                .insert({
                    "request_messages.request_id": id,
                    "request_messages.user_id": user1,
                    "request_messages.message": message,
                })

            const newRequest = await trx("requests")
            .select(
                "requests.id",
                "requests.user1_id",
                "requests.user2_id",
                "requests.request_start",
                "requests.request_end",
                "requests.status",
                "request_messages.message",
            )
            .join("request_messages", "requests.id", "=", "request_messages.request_id")
            .where("requests.id", id)
            .first()
            
            res.status(201).json(newRequest);
        })
    } catch (error) {
        res.status(500).json({
            message: `Unable to make request: ${error}`,
        });
    }
}

const sendMessage = async (req, res) => {
    const { requestId } = req.params;
    const { userId, message } = req.body;

    if (!userId || !message || !requestId ) {
        return res.status(400).json({
            message: "Missing data"
        })
    }
    
    try {
        const request = await knex("requests")
            .where("id", requestId)
            .first();

        if(!request) {
            res.status(404).json({
                message: `Request with id ${requestId} not found.`
            })
        }

        const result = await knex("request_messages")
            .insert({
                "user_id": userId,
                "request_id": requestId,
                "message": message,
            })

        const [ id ] = result;

        const newMessage = await knex("request_messages")
            .where({ id })
            .first()

        res.status(201).json(newMessage);
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

const editRequest = async (req, res) => {
    

    try {
        const updated = await knex("requests")
            .where({ id: req.params.requestId })
            .update(req.body);

        if (!updated) {
            return res.status(404).json({
                message: `Request ${request.params.requestId} not found`
            })
        }

        const updatedRequest = await knex("requests")
            .where({ id: req.params.requestId })
            .first();

        res.status(200).json(updatedRequest);

    } catch (error) {
        res.status(500).json({
            message: "Error updating request"
        })
    }
}

module.exports = {
    getRequests,
    requestById,
    getRequestMessages,
    sendMessage,
    sendRequest,
    cancelRequest,
    editRequest,
}