const Data = require("../model/DataSchema");

const fetchController = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const search = req.query.search || ""; 

    const searchRegex = new RegExp(search, "i"); // for case-insensetive

    const totalDocuments = await Data.countDocuments({
      $or: [
        { name: searchRegex }, 
        { category: searchRegex },
        { subcategory: searchRegex },
      ],
    });

    const data = await Data.find({
      $or: [
        { name: searchRegex },
        { category: searchRegex },
        { subcategory: searchRegex },
      ],
    })
      .skip(skip) //skiping previous pages
      .limit(limit); // limit is 10

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
