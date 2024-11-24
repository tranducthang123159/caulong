import React, { useState } from 'react';
import { Row, Col, Card, Button, Form, Input, List, Typography, message } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;

const CheckoutPage = () => {
  const navigate = useNavigate();
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');

  // Fetch the cart from local storage
  const cart = JSON.parse(localStorage.getItem('cart')) || [];

  const handleSubmitOrder = async () => {
    if (!customerName || !customerEmail || !shippingAddress) {
      message.error('Vui lòng điền đầy đủ thông tin!');
      return;
    }

    const orderData = {
      customer_name: customerName,
      customer_email: customerEmail,
      shipping_address: shippingAddress,
      items: cart.map((item) => ({
        product_id: item.id,
        quantity: item.quantity,
        price: item.price,
      })),
      total_price: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    };

    try {
      const response = await fetch('http://localhost:8000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) throw new Error('Failed to create order');
      const data = await response.json();
      message.success('Đơn hàng đã được tạo thành công!');
      localStorage.removeItem('cart');
      navigate(`/order/${data.order_id}`); // Redirect to the order confirmation page
    } catch (error) {
      message.error('Đặt hàng thất bại!');
    }
  };

  return (
    <Row justify="center" style={{ padding: '20px' }}>
      {/* Left Column: Customer Information Form */}
      <Col span={12} style={{ paddingRight: '20px' }}>
        <Card title="Thông tin thanh toán" bordered={false}>
          <Form>
            {/* Name Input */}
            <Form.Item label="Họ và tên" required>
              <Input
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Nhập họ và tên"
              />
            </Form.Item>

            {/* Email Input */}
            <Form.Item label="Email" required>
              <Input
                type="email"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                placeholder="Nhập email"
              />
            </Form.Item>

            {/* Shipping Address Input */}
            <Form.Item label="Địa chỉ giao hàng" required>
              <Input
                value={shippingAddress}
                onChange={(e) => setShippingAddress(e.target.value)}
                placeholder="Nhập địa chỉ giao hàng"
              />
            </Form.Item>

            {/* Submit Button */}
            <Button
              type="primary"
              onClick={handleSubmitOrder}
              style={{ width: '100%' }}
            >
              Xác nhận đơn hàng
            </Button>
          </Form>
        </Card>
      </Col>

      {/* Right Column: Cart Items */}
      <Col span={12}>
        <Card title="Giỏ hàng" bordered={false}>
          <List
            itemLayout="horizontal"
            dataSource={cart}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  title={item.name}
                  description={`Số lượng: ${item.quantity} - Giá: ${item.price}đ`}
                />
              </List.Item>
            )}
          />
          <Text strong>
            Tổng tiền: {cart.reduce((total, item) => total + item.price * item.quantity, 0)}đ
          </Text>
        </Card>
      </Col>
    </Row>
  );
};

export default CheckoutPage;
