const Product = require('../Models/Product');
const url = require('url');
const vendor=require('../Models/Vendor');

const createProduct = async (req, res) => {
  const {
    vendorId,
    Name,
    imageUrl,
    type,
    brand,
    model,
    description,
    price,
    quantity
  } = req.body;

  try {
    const product = new Product({
      vendorId,
      Name,
      imageUrl,
      type,
      brand,
      model,
      description,
      price,
      quantity
    });

    await product.save();

    res.status(201).json({ success: true, data: product });
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

const editProduct = async (req, res) => {
  const productId = req.params.id;
  const updates = req.body;

  try {
    const product = await Product.findByIdAndUpdate(productId, updates, {
      new: true, // Return the modified document rather than the original
      runValidators: true // Run model validation before updating
    });

    if (!product) {
      return res.status(404).json({ success: false, error: 'Product not found' });
    }

    res.status(200).json({ success: true, data: product });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ success: false, error: error.message });
  }
  
};

// Controller function to delete a product
const deleteProduct = async (req, res) => {
  const productId = req.params.id;

  try {
    const product = await Product.findByIdAndDelete(productId);

    if (!product) {
      return res.status(404).json({ success: false, error: 'Product not found' });
    }

    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
};

  // Controller function to get all products of a particular vendor
const getVendorProducts = async (req, res) => {
    const vendorId = req.params.vendorId; // Assuming the vendor ID is passed as a parameter
  
    try {
      // Find all products where vendorId matches the provided vendor ID
      const products = await Product.find({ vendorId });
  
      res.status(200).json({ success: true, data: products });
    } catch (error) {
      console.error('Error fetching vendor products:', error);
      res.status(500).json({ success: false, error: 'Server error' });
    }
  };

  const getProductsByType = async (req, res) => {
    console.log(req.params.type)
  const type = req.params.type; // Assuming the type is passed as a parameter
    
      try {
        // Find all products where type matches the provided type
        const products = await Product.find({ type });
        
        res.status(200).json({ success: true, data: products });
      } catch (error) {
        console.error('Error fetching products by type:', error);
        res.status(500).json({ success: false, error: 'Server error' });
      }
    };

    const getProductById = async (req, res) => {
      console.log(req.params)
      const productId = req.params.id; 
      console.log(productId);// Assuming the product ID is passed as a parameter
    
      try {
        // Find the product by its ID
        const product = await Product.findOne({ _id: productId });;
    
        // Check if the product exists
        if (!product) {
          return res.status(404).json({ success: false, error: 'Product not found' });
        }
    
        // If the product exists, return its properties
        const {
          _id,
          Name,
          vendorId,
          imageUrl,
          type,
          brand,
          model,
          description,
          price,
          quantity
        } = product;
    
        res.status(200).json({
          success: true,
          data: {
            _id,
            Name,
            vendorId,
            imageUrl,
            type,
            brand,
            model,
            description,
            price,
            quantity
          }
        });
      } catch (error) {
        console.error('Error fetching product by ID:', error);
        res.status(500).json({ success: false, error: 'Server error' });
      }
    };
const getBname=async(req,res)=>{
  const id=req.params.productID;
  try{
    const details=await Product.findOne({_id:id});
    const ans=await vendor.findOne({_id:details.vendorId});
    console.log(ans.Bname)
    res.status(200).json({Bname:ans.Bname});
  }
  catch(err){
    res.status(200).json({bool:false, error:err});
  }
}

module.exports = {
  createProduct,
  editProduct,
  deleteProduct,
  getVendorProducts,
  getProductsByType,
  getProductById,
  getBname
};
