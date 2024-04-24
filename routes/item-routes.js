const router = require("express").Router();
const itemController = require('../controllers/item-controller');

router.route("/")
    .get(itemController.allItems);

module.exports = router;