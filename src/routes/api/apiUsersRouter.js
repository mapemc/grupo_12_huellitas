const express = require("express");
const router = express.Router();
/*autenticador */
const adminMiddleware = require('../../middlewares/adminMiddleware.js');


const apiUsersController = require("../../controllers/api/apiUsersController.js");

router.get("/", adminMiddleware, (req, res) => {
    apiUsersController.getUsers(req, res);
});

router.get("/:username", adminMiddleware, (req, res) => {
    apiUsersController.getUserByUsername(req, res);
});

module.exports = router;
