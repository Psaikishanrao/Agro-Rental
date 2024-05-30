const express = require('express');
const router = express.Router();
const productController = require('../Controllers/productController');


router.post('/', productController.createProduct); // Update the route to '/'
router.put('/:id', productController.editProduct);
router.delete('/:id', productController.deleteProduct);
router.get('/vendor/:vendorId', productController.getVendorProducts);
router.get('/type/:type',productController.getProductsByType);
router.get('/:id',productController.getProductById);
router.get('/Bname/:productID', productController.getBname); 

module.exports = router;
