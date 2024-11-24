import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';  // To access the order ID from URL
import { Row, Col, Card, Typography, Button, Divider, List, message, Select } from 'antd';
import axios from 'axios';

const { Title, Text } = Typography;
const { Option } = Select;

const OrderDetailsComponent = () => {
  const { id } = useParams();  // Get the order ID from URL
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('');  // Track the selected status

  useEffect(() => {
    // Fetch order details when component mounts
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/orders/${id}`);
        setOrder(response.data);
        setStatus(response.data.status);  // Set initial status
      } catch (err) {
        setError('Failed to fetch order details');
        message.error('Lỗi khi tải chi tiết đơn hàng');
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [id]);

  // Function to handle status change
  const handleStatusChange = async (newStatus) => {
    try {
      const response = await axios.put(`http://localhost:8000/api/orders/${id}/status`, {
        status: newStatus,
      });
      setOrder(response.data);  // Update order details with new status
      setStatus(newStatus);  // Update the local state with new status
      message.success('Trạng thái đơn hàng đã được cập nhật');
    } catch (err) {
      message.error('Không thể cập nhật trạng thái đơn hàng');
    }
  };

  if (loading) {
    return <div>Loading order details...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!order) {
    return <div>Order not found</div>;
  }

  return (
    <Row justify="center" style={{ padding: '20px' }}>
      <Col span={18}>
        <Card
          bordered={false}
          style={{ boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', padding: '20px' }}
        >
          {/* Order Details */}
          <Title level={2}>Đơn hàng #{order.id}</Title>
          <Text strong>Trạng thái: </Text>
          <Text>{order.status}</Text>
          <Divider />

          {/* Customer Information */}
          <Title level={4}>Thông tin khách hàng</Title>
          {order.customer ? (
            <>
              <Text strong>Họ và tên: </Text>
              <Text>{order.customer.name}</Text>
              <br />
              <Text strong>Email: </Text>
              <Text>{order.customer.email}</Text>
              <br />
              <Text strong>Địa chỉ giao hàng: </Text>
              <Text>{order.customer.address}</Text>
            </>
          ) : (
            <Text>Thông tin khách hàng không có sẵn</Text>
          )}
          <Divider />

          {/* Order Items */}
          <Title level={4}>Sản phẩm trong đơn hàng</Title>
          <List
            itemLayout="horizontal"
            dataSource={order.items}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  title={item.product.name}
                  description={
                    <>
                      <Text strong>Số lượng: </Text>
                      <Text>{item.quantity}</Text>
                      <br />
                      <Text strong>Giá: </Text>
                      <Text>{item.price}đ</Text>
                    </>
                  }
                />
              </List.Item>
            )}
          />
          <Divider />

          {/* Total Price */}
          <Row justify="space-between">
            <Col>
              <Text strong>Tổng giá trị đơn hàng: </Text>
            </Col>
            <Col>
              <Text>{order.total_price}đ</Text>
            </Col>
          </Row>

          {/* Status Update */}
          <Row justify="space-between" style={{ marginTop: '20px' }}>
            <Col>
              <Text strong>Chọn trạng thái: </Text>
            </Col>
            <Col>
              <Select
                value={status}
                style={{ width: 200 }}
                onChange={handleStatusChange}
              >
                <Option value="Pending">Chờ xử lý</Option>
                <Option value="Shipped">Đã vận chuyển</Option>
                <Option value="Delivered">Đã giao</Option>
                <Option value="Cancelled">Đã hủy</Option>
              </Select>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  );
};

export default OrderDetailsComponent;
