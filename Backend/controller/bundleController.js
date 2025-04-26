const PerfumeBundle = require('../model/PerfumeBundle');
const Product = require('../model/Product');
const uploadToCloudinary = require('../helper/cloudinaryHelper');

// CREATE
exports.createBundle = async (req, res) => {
  try {
    const { title, options, size } = req.body;

    // Validate that options is an array
    if (!Array.isArray(options)) {
      return res.status(400).json({ success: false, message: 'Options must be an array' });
    }

    let mainImageUrl;

    // Upload the main image if provided
    if (req.file) {
      const uploaded = await uploadToCloudinary(req.file.buffer);
      mainImageUrl = uploaded.secure_url;
    } else {
      return res.status(400).json({ success: false, message: 'Main image is required' });
    }

    // Calculate totalPrice, priceSaved, and percentageSaved
    const allPrices = options
      .flatMap(option => option.perfumes || []) // Ensure perfumes is an array
      .map(perfume => parseFloat(perfume.price) || 0); // Ensure price is number

    const totalPrice = allPrices.reduce((sum, p) => sum + p, 0);
    const mostExpensive = Math.max(...allPrices);
    const priceSaved = mostExpensive;
    const percentageSaved = ((priceSaved / totalPrice) * 100).toFixed(1);

    const newBundle = new PerfumeBundle({
      title,
      mainImage: mainImageUrl,
      options,
      size,
      totalPrice,
      priceSaved,
      percentageSaved,
    });

    await newBundle.save();

    res.status(201).json({ success: true, bundle: newBundle });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};


// GET ALL BUNDLES
exports.getAllBundles = async (req, res) => {
  try {
    const bundles = await PerfumeBundle.find();
    res.status(200).json({ success: true, bundles });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// GET SINGLE BUNDLE
exports.getBundleById = async (req, res) => {
  try {
    const bundle = await PerfumeBundle.findById(req.params.id);
    if (!bundle) {
      return res.status(404).json({ success: false, message: 'Bundle not found' });
    }
    res.status(200).json({ success: true, bundle });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// UPDATE
exports.updateBundle = async (req, res) => {
  try {
    const { title, options, size } = req.body;
    let mainImageUrl = req.body.mainImage; // fallback to existing one

    // Upload new image if provided
    if (req.file) {
      const uploaded = await uploadToCloudinary(req.file.buffer);
      mainImageUrl = uploaded.secure_url;
    }

    const allPerfumes = options.flatMap(opt => opt.perfumes);
    const perfumesData = await Product.find({ _id: { $in: allPerfumes } });

    const prices = perfumesData.map(p => p.price);
    const totalPrice = prices.reduce((sum, p) => sum + p, 0);
    const mostExpensive = Math.max(...prices);
    const priceSaved = mostExpensive;
    const percentageSaved = ((priceSaved / totalPrice) * 100).toFixed(1);

    const updatedBundle = await PerfumeBundle.findByIdAndUpdate(
      req.params.id,
      {
        title,
        mainImage:mainImageUrl,
        options,
        size,
        totalPrice,
        priceSaved,
        percentageSaved,
      },
      { new: true }
    );

    if (!updatedBundle) {
      return res.status(404).json({ success: false, message: 'Bundle not found' });
    }

    res.status(200).json({ success: true, bundle: updatedBundle });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// DELETE
exports.deleteBundle = async (req, res) => {
  try {
    const deleted = await PerfumeBundle.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Bundle not found' });
    }
    res.status(200).json({ success: true, message: 'Bundle deleted' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
