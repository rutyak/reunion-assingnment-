const Data = require("../model/DataSchema");

const fetchController = async (req, res) => {
  try {
    // Get page and limit from query parameters, with defaults
    const page = parseInt(req.query.page) || 1; // Default to 1 if not provided
    const limit = parseInt(req.query.limit) || 10; // Default to 10 if not provided

    // Calculate the number of documents to skip
    const skip = (page - 1) * limit;

    // Fetch total number of documents for pagination
    const totalDocuments = await Data.countDocuments();

    // Fetch the data with pagination
    const data = await Data.find().skip(skip).limit(limit);

    // Return the paginated data along with the total count
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
