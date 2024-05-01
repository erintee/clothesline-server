const knex = require('knex')(require("../knexfile"));

const getItems = async (req, res) => {
    try {
        const query = req.query;
        const user = await knex("users")
            .where({ id: req.payload.id })
            .first();

        const items = await knex("items")
            .select(
                "items.type",
                "items.id",
                "items.title",
                "items.colour",
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
                    .union(knex("friendships")
                        .select("user1_id")
                        .where("user2_id", user.id)
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

const postItem = async (req, res) => {
    const { user_id, title, type, colour, size } = req.body;
    console.log(user_id, title, type, colour, size)

    if (!type || !colour || !size ) {
        return res.status(400).json({
            message: "Missing form input data"
        });
    }

    try {
        console.log("adding to DB")
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

module.exports = {
    getItems,
    postItem,
}