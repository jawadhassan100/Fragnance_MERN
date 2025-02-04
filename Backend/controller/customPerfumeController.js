const CustomPerfume = require('../model/CustomPerfume'); 

// Create Custom Perfume
exports.createCustomPerfume = async (req, res) => {
  try {
    const { perfumeName, brand, price, size } = req.body;

    const customPerfume = new CustomPerfume({
      perfumeName,
      brand,
      price,
      size
    });

    await customPerfume.save();
    res.status(201).json({ message: 'Custom perfume created successfully.', customPerfume });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get All Custom Perfumes
exports.getAllCustomPerfumes = async (req, res) => {
  try {
    const customPerfumes = await CustomPerfume.find();
    res.status(200).json(customPerfumes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Custom Perfume by ID
exports.getCustomPerfumeById = async (req, res) => {
  try {
    const { id } = req.params;

    const customPerfume = await CustomPerfume.findById(id);
    if (!customPerfume) {
      return res.status(404).json({ error: 'Custom perfume not found.' });
    }

    res.status(200).json(customPerfume);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Edit Custom Perfume
exports.editCustomPerfume = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = { ...req.body };

    const customPerfume = await CustomPerfume.findByIdAndUpdate(id, updates, { new: true });

    if (!customPerfume) {
      return res.status(404).json({ error: 'Custom perfume not found.' });
    }

    res.status(200).json({ message: 'Custom perfume updated successfully.', customPerfume });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete Custom Perfume
exports.deleteCustomPerfume = async (req, res) => {
  try {
    const { id } = req.params;

    const customPerfume = await CustomPerfume.findById(id);
    if (!customPerfume) {
      return res.status(404).json({ error: 'Custom perfume not found.' });
    }

    await customPerfume.remove();
    res.status(200).json({ message: 'Custom perfume deleted successfully.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
