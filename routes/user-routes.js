const router = require("express").Router();
const { verify } = require("jsonwebtoken");
const userController = require('../controllers/user-controller');
const { verifyToken } = require('../middleware/auth.middleware');

router.route("/search/:email")
    .get(verifyToken, userController.searchUsers);

router.route("/active")
    .get(verifyToken, userController.getActiveUser);

router.route("/:userId")
    .get(verifyToken, userController.getUser)
    
router.route("/:userId/items")
    .get(verifyToken, userController.userItems);

module.exports = router;