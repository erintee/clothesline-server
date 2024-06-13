const knex = require('knex')(require("../knexfile"));
const fs = require('fs');

const getItems = async (req, res) => {
    try {
        const query = req.query;
        const user = await knex("users")
            .where({ id: req.payload.id })
            .first();

        const items = await knex("items")
            .select(
                "items.id",
                "items.title",
                "items.size",
                "items.image",
                "users.first_name",
            )
            .join("users", "items.user_id", "=", "users.id")
            .whereIn(
                "user_id", 
                knex("friendships")
                    .select("user2_id")
                    .where("user1_id", user.id)
                    .andWhere("status", "friends")
                    .union(knex("friendships")
                        .select("user1_id")
                        .where("user2_id", user.id)
                        .andWhere("status", "friends")
                    )
            )
            .where((qb) => {
                if (query.type) {
                  qb.where('items.type', '=', query.type);
                }
            
                if (query.colour) {
                  qb.andWhere('items.colour', '=', query.colour);
                }
            
                if (query.size) {
                  qb.andWhere('items.size', '=', query.size);
                }
            })

            res.status(200).json(items);
    } catch (error) {
        res.status(500).json({
            message: "Unable to fetch search results"
        })
    }
}

const itemById = async (req,res) => {
    try {
        const item = await knex("items")
            .select(
                "items.id",
                "items.title",
                "items.type",
                "items.colour",
                "items.size",
                "items.image",
                "items.user_id",
                "users.first_name",
            )
            .join("users", "items.user_id", "=", "users.id")
            .where("items.id", req.params.itemId)
            .first()
        res.status(201).json(item);

    } catch (error) {
        res.status(500).json({
            message: "Unable to fetch item data"
        })
    }
}

const postItem = async (req, res) => {
    const { user_id, title, type, colour, size } = req.body;

    if (!type || !colour || !size ) {
        return res.status(400).json({
            message: "Missing form input data"
        });
    }

    try {
        const result = await knex("items")
            .insert({
                user_id,
                title,
                type,
                colour,
                size,
                "image": req.file.filename,
            })
        
        const [id] = result;

        const newItem = await knex("items")
            .where({ id })
            .first();
        
        res.status(201).json(newItem);
    } catch (error) {
        res.status(500).json({
            message: `Unable to add new item: ${error}`,
        });
    }
}

const editItem = async (req, res) => {
    try {
        const { itemId } = req.params;

        const item = await knex("items")
            .where({ id: itemId })
            .first()

        if (!item) {
            return res.status(404).json({
                message: `Item ${itemId} not found.`
            })
        }

        if (item.user_id !== Number(req.payload.id)) {
            return res.status(403).json({
                message: "Unauthorized"
            })
        }

        // If update contains new photo
        if (req.file) {

            // Delete previous image file
            const filePath = `public/uploads/${item.image}`;
            fs.unlink(filePath, (err) => {
                if (err) {
                    console.error("Error removing file:", err)
                    return;
                }
            });

            const { title, type, colour, size } = req.body;

            await knex("items")
                .where({ id: itemId })
                .update({
                    title,
                    type,
                    colour,
                    size,
                    image: req.file.filename,
                })

        } else {
            await knex("items")
                .where({ id: itemId })
                .update(req.body);
        }

        const updatedItem = await knex("items")
            .where({ id: itemId })
            .first();

        res.status(200).json(updatedItem);

    } catch (error) {
        res.status(500).json({
            message: "Error updating item"
        })
    }
}

module.exports = {
    getItems,
    itemById,
    postItem,
    editItem,
}