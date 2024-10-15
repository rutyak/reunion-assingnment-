const express = require("express");
const fetchController = require("../controller/fetchController");

const router = express.Router();

router.get("/fetch/data", fetchController);

module.exports = router;
