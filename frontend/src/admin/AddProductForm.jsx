import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';  // If using react-router
import { Form, Button, Alert, Spinner } from 'react-bootstrap';

const AddProductForm = () => {
  const { productId } = useParams();  // Get productId from URL
  const [categories, setCategories] = useState([]);
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    quantity: '',
    category_id: '',
    image: null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Fetch categories
    fetch('http://localhost:8000/api/categories')
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error('Error fetching categories:', error));

    // If updating an existing product, fetch the product details
    if (productId) {
      fetch(`http://localhost:8000/api/products/${productId}`)
        .then((response) => response.json())
        .then((data) => setProduct(data))
        .catch((error) => console.error('Error fetching product:', error));
    }
  }, [productId]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: files ? files[0] : value,  // Handle file input
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('description', product.description);
    formData.append('price', product.price);
    formData.append('quantity', product.quantity);
    formData.append('category_id', product.category_id);
    if (product.image) formData.append('image', product.image);

    setIsSubmitting(true);
    setSuccessMessage('');
    setErrorMessage('');

    try {
      const response = await fetch(`http://localhost:8000/api/products/${productId || ''}`, {
        method: productId ? 'PUT' : 'POST',
        body: formData,
      });

      if (response.ok) {
        setSuccessMessage(productId ? 'Product updated successfully!' : 'Product added successfully!');
        // Reset form or redirect as needed
        if (!productId) {
          setProduct({
            name: '',
            description: '',
            price: '',
            quantity: '',
            category_id: '',
            image: null,
          });
        }
      } else {
        setErrorMessage('Error updating the product!');
      }
    } catch (error) {
      console.error('Error updating product:', error);
      setErrorMessage('Error updating the product!');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mt-4">
      <h2>{productId ? 'Update Product' : 'Add New Product'}</h2>
      
      {successMessage && <Alert variant="success">{successMessage}</Alert>}
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
      
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="productName">
          <Form.Label>Tên Sản Phẩm</Form.Label>
          <Form.Control
            type="text"
            name="name"
            placeholder="Nhập tên sản phẩm"
            value={product.name}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="productDescription" className="mb-3">
          <Form.Label>Mô Tả</Form.Label>
          <Form.Control
            as="textarea"
            name="description"
            placeholder="Nhập mô tả sản phẩm"
            value={product.description}
            onChange={handleChange}
            rows={3}
          />
        </Form.Group>

        <Form.Group controlId="productPrice" className="mb-3">
          <Form.Label>Giá</Form.Label>
          <Form.Control
            type="number"
            name="price"
            placeholder="Nhập giá sản phẩm"
            value={product.price}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="productQuantity" className="mb-3">
          <Form.Label>Số Lượng</Form.Label>
          <Form.Control
            type="number"
            name="quantity"
            placeholder="Nhập số lượng"
            value={product.quantity}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="productCategory" className="mb-3">
          <Form.Label>Danh Mục</Form.Label>
          <Form.Control
            as="select"
            name="category_id"
            value={product.category_id}
            onChange={handleChange}
            required
          >
            <option value="">Chọn Danh Mục</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="productImage" className="mb-3">
          <Form.Label>Ảnh Sản Phẩm</Form.Label>
          <Form.Control
            type="file"
            name="image"
            onChange={handleChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit" disabled={isSubmitting}>
          {isSubmitting ? <Spinner animation="border" size="sm" /> : (productId ? 'Cập Nhật Sản Phẩm' : 'Thêm Sản Phẩm')}
        </Button>
      </Form>
    </div>
  );
};

export default AddProductForm;
