const router = require("express").Router();
const itemController = require('../controllers/item-controller');

const path = require("path");
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
    .get(itemController.searchItems)
    // move this to users!
    .post(upload.single("image"), itemController.postItem);

// router.route("/search")
    // .get(itemController.searchItems)

module.exports = router;