const express = require("express");
const router = express.Router();

const apiUsersController = require("../../controllers/api/apiUsersController.js");

router.get("/", (req, res) => {
    apiUsersController.getUsers(req, res);
});

router.get("/:username", (req, res) => {
    apiUsersController.getUserByUsername(req, res);
});

module.exports = router;
