const knex = require('knex')(require("../knexfile"));
const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.SECRET_KEY;

const register = async (req, res) => {
    const { first_name, last_name, email, password } = req.body;
    
    if (!first_name || !last_name || !email || !password ) {
        return res.status(400).json({
            message: "Missing registration form data"
        });
    }

    try {
        const result = await knex("users")
            .insert({
                first_name,
                last_name,
                email,
                password,
            })
        console.log(result.id)
        const [ id ] = result;

        const newUser = await knex("users")
            .where({ id })
            .first();

        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({
            message: `Unable to register user: ${error}`
        })
    }
    
}

module.exports = {
    register,
}