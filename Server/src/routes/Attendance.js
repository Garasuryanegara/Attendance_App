const express = require("express");
const router = express.Router();
const attendController = require("../controllers").attendController;

router.get("/all", attendController.getAll);
router.get("/:id", attendController.getById);
router.post("/:id", attendController.insertClockIn);
router.patch("/:id", attendController.InsertClockOut);

module.exports = router;
