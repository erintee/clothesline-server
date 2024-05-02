const router = require("express").Router();
const userController = require('../controllers/user-controller');
const { verifyToken } = require('../middleware/auth.middleware');

router.route("/:userId")
    .get(userController.getUser);
router.route("/:userId/items")
    .get(verifyToken, userController.userItems);

module.exports = router;