import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Modal, Form } from 'react-bootstrap';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    // Fetch products and categories from API
    axios.get('http://localhost:8000/api/products')
      .then(response => {
        setProducts(response.data);
        console.log('Fetched Products:', response.data);  // Check product data
      })
      .catch(error => console.error('Error fetching products:', error));

    axios.get('http://localhost:8000/api/categories')
      .then(response => {
        setCategories(response.data);
        console.log('Fetched Categories:', response.data);  // Check category data
      })
      .catch(error => console.error('Error fetching categories:', error));
  }, []);

  // Function to get category name by ID
  const getCategoryNameById = (categoryId) => {
    const category = categories.find(c => c.id === categoryId);
    return category ? category.name : 'No category';  // Default to 'No category' if not found
  };

  const handleEditClick = (product) => {
    setSelectedProduct(product);
    setShowEditModal(true);
  };

  const handleDeleteClick = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      axios.delete(`http://localhost:8000/api/products/${id}`)
        .then(() => {
          setProducts(products.filter(product => product.id !== id));
          alert('Product deleted successfully!');
        })
        .catch(error => console.error('Error deleting product:', error));
    }
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    const { name, description, price, quantity, category } = e.target.elements;

    const updatedProduct = {
      name: name.value,
      description: description.value,
      price: price.value,
      quantity: quantity.value,
      category_id: category.value, // Add selected category id
    };

    axios.put(`http://localhost:8000/api/products/${selectedProduct.id}`, updatedProduct)
      .then(response => {
        setProducts(products.map(product =>
          product.id === selectedProduct.id ? response.data : product
        ));
        setShowEditModal(false);
        alert('Product updated successfully!');
      })
      .catch(error => console.error('Error updating product:', error));
  };

  return (
    <div className="container-fluid">
      <h2 className="mb-4">Danh Sách Sản Phẩm</h2>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Tên</th>
            <th>Mô Tả</th>
            <th>Giá</th>
            <th>Số Lượng</th>
            <th>Danh Mục</th>
            <th>Hình Ảnh</th>
            <th>Hành Động</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>{product.price}</td>
              <td>{product.quantity}</td>
              <td>{getCategoryNameById(product.category_id)}</td>
              <td>
                {product.image_url ? (
                  <img
                    src={`http://localhost:8000/storage/${product.image_url}`}
                    alt={product.name}
                    style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                  />
                ) : (
                  <span>No Image</span>
                )}
              </td>
              <td>
                <Button variant="warning" onClick={() => handleEditClick(product)}>
                  Chỉnh Sửa
                </Button>
                <Button variant="danger" onClick={() => handleDeleteClick(product.id)}>
                  Xóa
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Edit Product Modal */}
      <Modal
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        size="lg"  // This makes the modal larger
      >
        <Modal.Header closeButton>
          <Modal.Title>Chỉnh Sửa Sản Phẩm</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleEditSubmit}>
            <Form.Group controlId="productName">
              <Form.Label>Tên Sản Phẩm</Form.Label>
              <Form.Control
                type="text"
                defaultValue={selectedProduct?.name}
                name="name"
                required
              />
            </Form.Group>

            <Form.Group controlId="productDescription">
              <Form.Label>Mô Tả</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                defaultValue={selectedProduct?.description}
                name="description"
                required
              />
            </Form.Group>

            <Form.Group controlId="productPrice">
              <Form.Label>Giá</Form.Label>
              <Form.Control
                type="number"
                defaultValue={selectedProduct?.price}
                name="price"
                required
              />
            </Form.Group>

            <Form.Group controlId="productQuantity">
              <Form.Label>Số Lượng</Form.Label>
              <Form.Control
                type="number"
                defaultValue={selectedProduct?.quantity}
                name="quantity"
                required
              />
            </Form.Group>

            <Form.Group controlId="productCategory">
              <Form.Label>Danh Mục</Form.Label>
              <Form.Control as="select" name="category" defaultValue={selectedProduct?.category_id} required>
                {categories.length > 0 ? (
                  categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))
                ) : (
                  <option disabled>Loading categories...</option>
                )}
              </Form.Control>
            </Form.Group>

            <Button variant="primary" type="submit">
              Cập Nhật Sản Phẩm
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ProductList;
