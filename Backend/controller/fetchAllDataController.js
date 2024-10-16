const Data = require("../model/DataSchema");

const fetchAllDataController = async (req, res) => {
    try {
        const data = await Data.find();
        res.status(200).json({ data }); 
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = fetchAllDataController;