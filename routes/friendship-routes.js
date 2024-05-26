const router = require("express").Router();
const friendshipController = require('../controllers/friendships-controller');
const { verifyToken } = require('../middleware/auth.middleware');

router.route("/")
    .post(verifyToken, friendshipController.requestFriend)
    .get(verifyToken, friendshipController.getFriendshipRequests);

router.route("/:friendshipId")
    .put(verifyToken, friendshipController.respondFriendship)
    .delete(verifyToken, friendshipController.deleteFriendship);

module.exports = router;