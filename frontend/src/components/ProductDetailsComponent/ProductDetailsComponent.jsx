import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Button, Typography, Divider, Image, message } from 'antd';  // Import 'message' here
import { useParams, useNavigate } from 'react-router-dom';  // To access the productId from URL and navigate
import { StarFilled, PlusOutlined, MinusOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const ProductDetailsComponent = () => {
  const { id } = useParams();  // Use the `id` parameter from the URL (the dynamic part of the path)
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);  // For managing quantity of product
  const navigate = useNavigate();  // Use the useNavigate hook to navigate

  const fetchProduct = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8000/api/products/${id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status} - ${response.statusText}`);
      }
      const data = await response.json();
      if (data) {
        setProduct(data);
      } else {
        throw new Error('Sản phẩm không tìm thấy');
      }
    } catch (error) {
      console.error('Error fetching product:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const handleQuantityChange = (type) => {
    setQuantity((prevQuantity) => {
      if (type === 'increase') return prevQuantity + 1;
      if (type === 'decrease' && prevQuantity > 1) return prevQuantity - 1;
      return prevQuantity;
    });
  };

  // Handle adding product to cart
  const handleAddToCart = () => {
    const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
    const newItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity,
      image_url: product.image_url,
    };

    // Check if product already exists in the cart
    const existingItemIndex = existingCart.findIndex((item) => item.id === newItem.id);

    if (existingItemIndex !== -1) {
      // Update quantity if product exists
      existingCart[existingItemIndex].quantity += quantity;
    } else {
      // Add new item to the cart
      existingCart.push(newItem);
    }

    // Save the updated cart to localStorage
    localStorage.setItem('cart', JSON.stringify(existingCart));

    message.success('Sản phẩm đã được thêm vào giỏ hàng!');  // Show success message

    // Redirect to the cart page
    navigate('/cart');  // Assuming the cart page is at '/cart'
  };

  if (loading) {
    return <div>Loading product details...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <Row justify="center" style={{ padding: '20px' }}>
      <Col span={16}>
        {/* Card layout for Product */}
        <Card
          bordered={false}
          style={{ boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', padding: '20px' }}
        >
          {/* Product Image */}
          <Row gutter={24}>
            <Col span={8} style={{ height: '100%' }}>
              <Image
                alt={product.name}
                src={`http://localhost:8000/storage${product.image_url}`}
                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '4px' }}  // This makes it fill the container
                preview={false}
              />
            </Col>

            {/* Product Info on the Right */}
            <Col span={16}>
              <Title level={2}>{product.name}</Title>
              <Row justify="space-between" align="middle" style={{ marginBottom: '10px' }}>
                <Col>
                  {/* Displaying rating stars dynamically */}
                  <div>
                    {Array.from({ length: 5 }).map((_, index) => (
                      <StarFilled key={index} style={{ color: 'gold', fontSize: '18px' }} />
                    ))}
                  </div>
                </Col>
              </Row>

              {/* Product Category */}
              <Row justify="start" style={{ marginBottom: '16px' }}>
                <Col span={24}>
                  <Text strong>Danh mục: </Text>
                  <Text>{product.category_id}</Text>
                </Col>
              </Row>

              {/* Quantity and Price Section below the Category */}
              <Row justify="start" style={{ marginBottom: '16px' }}>
                <Col span={24}>
                  <Text strong>Số lượng còn lại: </Text>
                  <Text>{product.quantity}</Text>
                </Col>
              </Row>

              <Row justify="start" style={{ marginBottom: '16px' }}>
                <Col span={24}>
                  <Text strong>Giá: </Text>
                  <Text style={{ fontSize: '18px', fontWeight: '600' }}>{product.price}đ</Text>
                </Col>
              </Row>

              {/* Shipping Information */}
              <Row justify="start" style={{ marginBottom: '20px' }}>
                <Col>
                  <Text strong>Giao đến: </Text>
                  <Text>{product.shipping_address}</Text>
                </Col>
              </Row>

              {/* Quantity Selector */}
              <Row justify="start" style={{ marginBottom: '20px' }}>
                <Col>
                  <Button
                    icon={<MinusOutlined />}
                    onClick={() => handleQuantityChange('decrease')}
                    style={{ marginRight: '8px' }}
                  />
                </Col>
                <Col>
                  <Text style={{ fontSize: '18px' }}>{quantity}</Text>
                </Col>
                <Col>
                  <Button
                    icon={<PlusOutlined />}
                    onClick={() => handleQuantityChange('increase')}
                    style={{ marginLeft: '8px' }}
                  />
                </Col>
              </Row>

              {/* Buy Buttons */}
              <Row justify="start">
               
                <Col>
                  <Button
                    type="primary"
                    style={{ marginTop: '20px' }}
                    onClick={handleAddToCart}  // Add to cart action
                  >
                    Thêm giỏ hàng
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>

          {/* Product Description */}
          <Divider />
          <Row>
            <Col span={24}>
              <Text>{product.description}</Text>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  );
};

export default ProductDetailsComponent;
