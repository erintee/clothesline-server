const router = require("express").Router();
const { verifyToken } = require("../middleware/auth.middleware");
const requestsController = require("../controllers/requests-controller");

router.route("/:userId")
    .get(verifyToken, requestsController.getRequests)
router.route("/:itemId")
    .post(requestsController.sendRequest)

module.exports = router;