

import React, { useState, useEffect } from 'react';
import ProductItem from './ProductItem';
import EditProductForm from './EditProductForm'; // Import the EditProductForm component

const VendorProducts = ({ vendorID }) => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);

  useEffect(() => {
    fetchVendorProducts();
  }, [vendorID]);

  const fetchVendorProducts = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/product/${vendorID}`);
      if (!response.ok) {
        throw new Error('Failed to fetch vendor products');
      }
      const responseData = await response.json();
      setProducts(responseData.data);
    } catch (error) {
      console.error('Error fetching vendor products:', error);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setShowEditForm(true);
  };

  const handleSaveEdit = async (editedProduct) => {
    try {
      const response = await fetch(`http://localhost:5000/api/product/${editedProduct._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedProduct),
      });
      if (!response.ok) {
        throw new Error('Failed to update product');
      }
      const updatedProducts = products.map((product) =>
        product._id === editedProduct._id ? editedProduct : product
      );
      setProducts(updatedProducts);
      setEditingProduct(null);
      setShowEditForm(false);
      console.log('Product updated successfully:', editedProduct);
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const handleCancelEdit = () => {
    setEditingProduct(null);
    setShowEditForm(false);
  };
    const handleDelete = async (deletedProduct) => {
    try {
      // Make an API call to delete the product
      const response = await fetch(`http://localhost:5000/api/product/${deletedProduct._id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete product');
      }
      // Remove the deleted product from the state
      const updatedProducts = products.filter(product => product._id !== deletedProduct._id);
      setProducts(updatedProducts);
      console.log('Product deleted successfully:', deletedProduct);
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div className="vendor-products">
      <h2>Vendor Products</h2>
      {showEditForm && (
        <EditProductForm
          product={editingProduct}
          onSave={handleSaveEdit}
          onCancel={handleCancelEdit}
          
        />
      )}
      <div className="product-list">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductItem key={product._id} product={product} onEdit={handleEdit} onDelete={handleDelete}/>
          ))
        ) : (
          <p>No products available</p>
        )}
      </div>
    </div>
  );
};

export default VendorProducts;










