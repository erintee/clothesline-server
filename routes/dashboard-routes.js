const router = require("express").Router();
const { verifyToken } = require("../middleware/auth.middleware");
const dashboardController = require("../controllers/dashboard-controller")

router.route("/")
    .get(verifyToken, dashboardController.getDashboard);

module.exports = router;