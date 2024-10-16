const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const router = require("./router/DataFetch");
const seedData = require("./model/seedData");
require("dotenv").config(); 

const app = express();
const port = process.env.Port || 5000; 
const url = process.env.MongoDB_URL || "mongodb://localhost:27017/tableData"; 

mongoose
  .connect(url)
  .then(() => {
    console.log("MongoDB connection established....");
    // return seedData();
  })
  .catch((e) => {
    console.log("Connection error:", e);
  });

app.use(cors());
app.use(express.json());


app.use(router);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
