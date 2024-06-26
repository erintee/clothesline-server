const router = require("express").Router();
const itemController = require('../controllers/item-controller');
const { verifyToken } = require('../middleware/auth.middleware');
const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, "public/uploads");
    },
    filename: function (req, file, callback) {
        let filename = file.originalname;

        if (filename !== "undefined") {
            filename.toLowerCase().replace(' ', '-');
            filename = Date.now() + filename;
        }
        callback(null, filename);
    },
});
  
const upload = multer({ storage: storage });
  
router.route("/")
    .get(verifyToken, itemController.getItems)
    .post(upload.single("image"), itemController.postItem);

router.route("/:itemId")
    .get(itemController.itemById)
    .put(verifyToken, upload.single("image"), itemController.editItem);

module.exports = router;