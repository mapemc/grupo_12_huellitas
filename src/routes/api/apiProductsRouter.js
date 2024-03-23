const express = require("express");
const app = express();
const router = express.Router();

const apiProductsController = require("../../controllers/api/apiProductsController.js");

router.get("/", apiProductsController.list);

module.exports = router;