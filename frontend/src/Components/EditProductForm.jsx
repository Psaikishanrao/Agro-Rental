
import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Container,
  Grid,
  Typography,
} from '@material-ui/core';

const EditProductForm = ({ product, onSave, onCancel, onDelete }) => {
  const [editedProduct, setEditedProduct] = useState({ ...product });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(editedProduct);
  };

  const handleCancel = () => {
    onCancel(); // Call the onCancel function passed from the parent component
  };

  const handleSaveEdit = async () => {
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
      console.log('Product updated successfully:', editedProduct);
      onSave(editedProduct);
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/product/${product._id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete product');
      }
      onDelete(product);
      console.log('Product deleted successfully:', product);
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Edit Product
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Image URL"
              fullWidth
              name="imageUrl"
              value={editedProduct.imageUrl}
              onChange={handleChange}
            />
          </Grid>
          {/* Add other fields here */}
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleSaveEdit}
            >
              Save Changes
            </Button>
            <Button
              type="button"
              variant="outlined"
              color="secondary"
              fullWidth
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="contained"
              color="secondary"
              fullWidth
              onClick={handleDelete}
            >
              Delete Product
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default EditProductForm;
