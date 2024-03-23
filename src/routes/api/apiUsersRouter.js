const express = require("express");
const app = express();
const router = express.Router();

const apiUsersController = require("../../controllers/api/apiUsersController.js");

//router.get("/", apiUsersController.list);

module.exports = router;