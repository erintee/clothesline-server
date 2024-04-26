const router = require("express").Router();
const userController = require('../controllers/user-controller');

router.route("/:userId/items")
    .get(userController.userItems);

module.exports = router;