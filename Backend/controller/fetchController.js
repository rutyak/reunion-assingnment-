const Data = require("../model/DataSchema");

const fetchController = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const skip = (page - 1) * limit;

    const totalDocuments = await Data.countDocuments();

    const data = await Data.find().skip(skip).limit(limit);

    res.status(200).json({
      total: totalDocuments,
      page,
      limit,
      data,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = fetchController;
