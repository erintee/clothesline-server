const knex = require('knex')(require("../knexfile"));
const path = require('node:path'); 

const allItems = async (_req, res) => {
    try {
        const items = await knex("items")
            .select(
                "items.type",
                "items.id",
                "items.colour",
                "items.size",
                "items.image",
                "users.name"            
            )
            .join("users", "items.user_id", "=", "users.id");

        res.status(200).json(items);
    } catch (error) {
        res.status(500).send("Error retrieving items:", error);
    }
}


const postItem = async (req, res) => {
    console.log(req.body)

    const { type, colour, size } = req.body;
    const userId = "599e382f-dfec-469a-8ff5-342f5b2767b1"
    
    if (!type || !colour || !size ) {
        return res.status(400).json({
            message: "Missing form input data"
        });
    }

    try {
        const result = await knex("items")
            .insert({
                type,
                colour,
                size,
                "image": req.file.filename,
                "user_id": userId,
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

const searchItems = async (req, res) => {
    try {
        const query = req.query;
        console.log(query)
        console.log(query.type)
        console.log(typeof query.type)
        const items = await knex("items")
            .select(
                "items.type",
                "items.id",
                "items.colour",
                "items.size",
                "items.image",
                // "users.name",
            )
            .where(
                {"items.type": query.type}
            )
            .orWhere(
                {"items.colour": query.colour}
            )
            // .andWhere(
            //     function () {
            //         if(query.colour) {
            //             this.where("item.colour", query.colour)
            //         }
            //     }
            // )
        
            res.status(200).json(items);
    } catch (error) {
        res.status(500).json({
            message: "Unable to fetch search results"
        })
    }
}


module.exports = {
    allItems,
    postItem,
    searchItems,
}