const express = require("express");
const fetchAllDataController = require("../controller/fetchAllDataController")

const router = express.Router();

router.get("/fetch/alldata", fetchAllDataController)

module.exports = router;
