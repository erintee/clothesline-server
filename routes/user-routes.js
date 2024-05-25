const router = require("express").Router();
const { verify } = require("jsonwebtoken");
const userController = require('../controllers/user-controller');
const { verifyToken } = require('../middleware/auth.middleware');

router.route("/search")
    .get(verifyToken, userController.searchUsers);

// Get rid of this and use token instead on front end
router.route("/active")
    .get(verifyToken, userController.getActiveUser);

router.route("/:userId")
    .get(userController.getUser)
    
router.route("/:userId/items")
    .get(verifyToken, userController.userItems);

module.exports = router;