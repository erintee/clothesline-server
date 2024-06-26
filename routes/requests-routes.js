const router = require("express").Router();
const { verifyToken } = require("../middleware/auth.middleware");
const requestsController = require("../controllers/requests-controller");

router.route("/")
    .get(verifyToken, requestsController.getRequests);

router.route("/:itemId")
    .post(verifyToken, requestsController.sendRequest);

router.route("/:requestId")
    .get(verifyToken, requestsController.requestById)
    .delete(verifyToken, requestsController.cancelRequest)
    .put(verifyToken, requestsController.editRequest);

router.route("/:requestId/messages")
    .get(verifyToken, requestsController.getRequestMessages)
    .post(verifyToken, requestsController.sendMessage);

module.exports = router;