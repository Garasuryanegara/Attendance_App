const express = require("express");
const { fileUploader, upload } = require("../middlewares/multer");
const router = express.Router();
const userController = require("../controllers").userController;

router.post("/", userController.insertUser);
router.post("/v1", userController.login);
router.post("/v2", userController.loginV2);
router.get("/token", userController.getByToken);
router.get("/v3", userController.getByTokenV2, userController.getUserByToken);
router.get("/generate-token/email", userController.generateTokenByEmail);
router.patch("/v4", userController.getByTokenV2, userController.changePassword);
router.post(
  "/image/v1/:id",
  fileUploader({
    destinationFolder: "avatar",
  }).single("avatar"),
  userController.uploadAvatar
);
router.post(
  "/image/v2/:id",
  upload.single("avatar"),
  userController.uploadAvatarV2
);
router.get("/image/render/:id", userController.renderAvatar);

module.exports = router;
