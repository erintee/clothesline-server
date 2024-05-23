const router = require("express").Router();
const userController = require('../controllers/user-controller');
const { verifyToken } = require('../middleware/auth.middleware');

router.route("/search")
    .get(verifyToken, userController.searchUsers);

router.route("/active")
    .get(verifyToken, userController.getActiveUser);

router.route("/:userId")
    .get(userController.getUser)
    .post(verifyToken, userController.requestFriend);
    // .put(verifyToken, userController.editFriend);

router.route("/:userId/items")
    .get(verifyToken, userController.userItems);

module.exports = router;