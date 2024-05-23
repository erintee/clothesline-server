const knex = require('knex')(require("../knexfile"));
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');

const SECRET_KEY = process.env.SECRET_KEY;

const register = async (req, res) => {
    const { first_name, last_name, email, password } = req.body;
    
    if (!first_name || !last_name || !email || !password ) {
        return res.status(400).json({
            message: "Missing registration form data",
        });
    }

    try {
        const check = await knex("users")
            .where({email: email})
            .first()

        if(check) {
            return res.status(400).send("User already exists")
        }

        const hash = await bcrypt.hash(password, 10);

        const result = await knex("users")
            .insert({
                first_name,
                last_name,
                email,
                "password": hash,
            })

        const [ id ] = result;

        const newUser = await knex("users")
            .where({ id })
            .first();

        const token = jwt.sign(
            {
                id: newUser.id,
                email: newUser.email,
                name: newUser.first_name,
            }, 
            SECRET_KEY
        )
        
        res.status(201).json({
            "user": newUser, 
            "token": token
        });
    } catch (error) {
        res.status(500).json({
            message: `Unable to register user: ${error}`,
        })
    }   
}

const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password ) {
        return res.status(400).json({
            message: "Missing login form data",
        });
    }

    try {
        const user = await knex("users")
            .where({ email: email })
            .first();
    
        if (!user) {
            return res.status(401).json({
                message: "User not found",
            })
        }
        
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        
        if (!isPasswordMatch) {
            return res.status(401).json({
                message: "Incorrect password",
            })
        }

        const token = jwt.sign(
            {
                id: user.id,
                email: user.email,
                name: user.first_name,
            }, 
            SECRET_KEY
        )
        res.status(200).send(token);
    } catch (error) {
        res.status(500).json({
            message: `Unable to login: ${error}`
        })
    }
}

module.exports = {
    register,
    login,
}