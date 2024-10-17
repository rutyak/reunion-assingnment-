const mongoose = require("mongoose");
const fs = require("fs");
const Data = require("./DataSchema");
const path = require("path");

const seedData = async () => {
  const rawData = fs.readFileSync(path.join(__dirname, "../Data.json"), "utf8");
  const data = JSON.parse(rawData);

  function formattedDate(dateStr) {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) {
      return null;
    }
    const options = { day: "2-digit", month: "short", year: "2-digit" };
    const newDate = date
      .toLocaleDateString("en-GB", options)
      .replace(/ /g, "-");
    return newDate;
  }

  try {
    for (const item of data) {
      const existingSong = await Data.findOne({ id: item.id });

      //date format
      const newItem = {
        ...item,
        createdAt: formattedDate(item.createdAt),
        updatedAt: formattedDate(item.updatedAt),
      };

      if (!existingSong) {
        await Data.create(newItem);
      } else {
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
