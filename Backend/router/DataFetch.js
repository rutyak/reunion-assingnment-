const express = require("express");
const fetchController = require("../controller/fetchController");
const fetchAllDataController = require("../controller/fetchAllDataController")

const router = express.Router();

router.get("/fetch/data", fetchController);

router.get("/fetch/alldata", fetchAllDataController)

module.exports = router;
