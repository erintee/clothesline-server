const knex = require('knex')(require("../knexfile"));

const getDashboard = async (req, res) => {
    try {
        const user = await knex("users")
            .where({ id: req.payload.id })
            .first();
            
            res.status(200).json({
                firstName: user.first_name,
                email: user.email,
                id: user.id,
            })
    } catch (error) {
        res.status(500).json({
            message: "Unable to fetch user data"
        })
    }
};

module.exports = {
    getDashboard,
}