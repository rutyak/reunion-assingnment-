const mongoose = require("mongoose");
const fs = require("fs");
const Data = require("./DataSchema");
const path = require('path');

const seedData = async () => {

  const rawData = fs.readFileSync(path.join(__dirname, '../Data.json'), 'utf8');
  const data = JSON.parse(rawData);

  try {
    for (const item of data) {
      const existingSong = await Data.findOne({ name: item.name });
      if (!existingSong) {
        await Data.create(item); 
      } else{
        console.log("Data already exist");
        return;
      }
    }
    console.log("Data added successfully");
  } catch (error) {
    console.error("Error adding songs:", error);
  } finally {
    mongoose.connection.close();
  }
};

module.exports = seedData;
