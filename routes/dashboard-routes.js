const router = require("express").Router();
const knex = require("knex")(require("../knexfile"));
const { verifyToken } = require("../middleware/auth.middleware");

router.route("/")
    .get(verifyToken, async (req, res) => {
        const user = await knex("users")
            .where({ id: req.payload.id })
            .first();
        
        console.log("profile:", user)

        res.status(200).json({
            firstName: user.first_name,
            email: user.email,
            id: user.id,
        })
    });

module.exports = router;