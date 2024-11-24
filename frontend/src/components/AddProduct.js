// src/pages/AddProduct.js
import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    quantity: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Product added:', product);
    // Gửi thông tin sản phẩm tới server hoặc API
  };

  return (
    <div>
      <h2>Thêm Sản Phẩm</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="productName">
          <Form.Label>Tên Sản Phẩm</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nhập tên sản phẩm"
            name="name"
            value={product.name}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="productDescription">
          <Form.Label>Mô Tả</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Nhập mô tả sản phẩm"
            name="description"
            value={product.description}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="productPrice">
          <Form.Label>Giá</Form.Label>
          <Form.Control
            type="number"
            placeholder="Nhập giá"
            name="price"
            value={product.price}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="productQuantity">
          <Form.Label>Số Lượng</Form.Label>
          <Form.Control
            type="number"
            placeholder="Nhập số lượng"
            name="quantity"
            value={product.quantity}
            onChange={handleChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit">Thêm Sản Phẩm</Button>
      </Form>
    </div>
  );
};

export default AddProduct;
