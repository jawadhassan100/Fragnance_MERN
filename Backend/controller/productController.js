const Product = require('../model/Product'); 
const uploadToCloudinary = require('../helper/cloudinaryHelper');

// Add Product
exports.addProduct = async (req, res) => {
  try {
    const { name, brand, description, weight, price,subtitle, salePrice, size, categories, Longevity, Sillage, stock } = req.body;

    if (!req.files || req.files.length > 5) {
      return res.status(400).json({ error: 'Maximum 5 images are allowed.' });
    }

    const imageUploadPromises = req.files.map((file) => uploadToCloudinary(file.buffer));
    const uploadedImages = await Promise.all(imageUploadPromises);

    const images = uploadedImages.map((image) => ({
      public_id: image.public_id,
      url: image.secure_url,
    }));

    const product = new Product({
      name,
      brand,
      subtitle,
      description,
      weight,
      price,
      salePrice,
      images,
      size,
      categories,
      Longevity,
      Sillage,
      stock,
    });

    await product.save();
    res.status(201).json({ message: 'Product added successfully.', product });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get All Products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Product by ID
exports.getProductById = async (req, res) => {
    try {
      const { id } = req.params;
  
      const product = await Product.findById(id);
      if (!product) {
        return res.status(404).json({ error: 'Product not found.' });
      }
  
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  
// Edit Product
exports.editProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = { ...req.body };

    if (req.files && req.files.length > 0) {
      if (req.files.length > 5) {
        return res.status(400).json({ error: 'Maximum 5 images are allowed.' });
      }

      const imageUploadPromises = req.files.map((file) => uploadToCloudinary(file.buffer));
      const uploadedImages = await Promise.all(imageUploadPromises);

      updates.images = uploadedImages.map((image) => ({
        public_id: image.public_id,
        url: image.secure_url,
      }));
    }

    const product = await Product.findByIdAndUpdate(id, updates, { new: true });

    if (!product) {
      return res.status(404).json({ error: 'Product not found.' });
    }

    res.status(200).json({ message: 'Product updated successfully.', product });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete Product
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found.' });
    }

    // Remove images from Cloudinary
    const deletePromises = product.images.map((image) =>
      cloudinary.uploader.destroy(image.public_id)
    );
    await Promise.all(deletePromises);

    await product.remove();
    res.status(200).json({ message: 'Product deleted successfully.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getProductStockForAdmin = async (req, res) => {
  try {
    // you can add authentication check here to make sure it's admin
    const products = await Product.find({}, 'name stock quantitySold');
    
    const withStatus = products.map(p => ({
      name: p.name,
      stock: p.stock,
      quantitySold: p.quantitySold,
      status: p.stock > 0 ? 'In Stock' : 'Out of Stock'
    }));

    res.status(200).json(withStatus);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
