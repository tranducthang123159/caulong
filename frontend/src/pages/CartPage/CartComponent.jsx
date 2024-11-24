import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Button, Typography, Divider, List, Image, message } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;

const CartComponent = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    setCart(savedCart ? JSON.parse(savedCart) : []);
  }, []);

  const handleCheckout = () => {
    if (cart.length === 0) {
      message.error('Giỏ hàng của bạn đang trống!');
      return;
    }
    navigate('/checkout');  // Navigate to the checkout page
  };

  return (
    <Row justify="center" style={{ padding: '20px' }}>
      <Col span={16}>
        <Card>
          <Title level={2}>Giỏ hàng</Title>
          <Divider />
          <List
            itemLayout="horizontal"
            dataSource={cart}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Image src={`http://localhost:8000/storage${item.image_url}`} width={50} />}
                  title={item.name}
                  description={`Số lượng: ${item.quantity} - Giá: ${item.price}đ`}
                />
              </List.Item>
            )}
          />
          <Divider />
          <Text strong>
            Tổng tiền:{' '}
            {cart.reduce((total, item) => total + item.price * item.quantity, 0)}đ
          </Text>
          <Button type="primary" style={{ marginTop: '20px' }} onClick={handleCheckout}>
            Thanh Toán
          </Button>
        </Card>
      </Col>
    </Row>
  );
};

export default CartComponent;
