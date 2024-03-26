const express = require("express");
const app = express();
const router = express.Router();

const apiProductsController = require("../../controllers/api/apiProductsController.js");


router.get("/", apiProductsController.list);
router.get("/:id", apiProductsController.detail);

module.exports = router;