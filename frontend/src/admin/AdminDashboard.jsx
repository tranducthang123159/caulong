import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, ProgressBar, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUsers,
  faBoxOpen,
  faDollarSign,
  faChartLine,
} from '@fortawesome/free-solid-svg-icons';
import './AdminDashboard.css'; // Optional CSS for custom styles

const AdminDashboard = () => {
  // States for data
  const [usersCount, setUsersCount] = useState(0);
  const [productsCount, setProductsCount] = useState(0);
  const [revenue, setRevenue] = useState(0);
  const [ordersCount, setOrdersCount] = useState(0);
  const [recentProducts, setRecentProducts] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);

  // Fetch data from API
  useEffect(() => {
    fetch('http://localhost:8000/api/dashboard') // API endpoint vừa tạo
      .then((response) => response.json())
      .then((data) => {
        setUsersCount(data.usersCount);
        setProductsCount(data.productsCount);
        setOrdersCount(data.ordersCount);
        setRevenue(data.revenue);
        setRecentProducts(data.recentProducts || []);  // Add fallback to empty array
        setRecentOrders(data.recentOrders || []);      // Add fallback to empty array
      })
      .catch((error) => console.error('Error fetching dashboard data:', error));
  }, []); // Empty dependency array to run on component mount

  return (
    <Container fluid className="admin-dashboard py-4">
      <h1 className="mb-4 text-center">Bảng Điều Khiển Quản Trị</h1>

      {/* Stats Row */}
      <Row className="g-4">
        <Col lg={3} md={6}>
          <Card className="shadow-sm text-center">
            <Card.Body>
              <FontAwesomeIcon icon={faUsers} size="2x" className="text-primary mb-3" />
              <h5 className="fw-bold">Người Dùng</h5>
              <h3>{usersCount}</h3>
              <p>Người dùng đã đăng ký mới nhất</p>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={3} md={6}>
          <Card className="shadow-sm text-center">
            <Card.Body>
              <FontAwesomeIcon icon={faBoxOpen} size="2x" className="text-success mb-3" />
              <h5 className="fw-bold">Sản Phẩm</h5>
              <h3>{productsCount}</h3>
              <p>Sản phẩm đã thêm mới nhất</p>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={3} md={6}>
          <Card className="shadow-sm text-center">
            <Card.Body>
              <FontAwesomeIcon icon={faDollarSign} size="2x" className="text-warning mb-3" />
              <h5 className="fw-bold">Doanh Thu</h5>
              <h3>${revenue}</h3>
              <p>Doanh thu từ các đơn hàng</p>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={3} md={6}>
          <Card className="shadow-sm text-center">
            <Card.Body>
              <FontAwesomeIcon icon={faChartLine} size="2x" className="text-danger mb-3" />
              <h5 className="fw-bold">Đơn Hàng</h5>
              <h3>{ordersCount}</h3>
              <p>Đơn hàng đã được xử lý</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Recent Activities Section */}
      <Row className="mt-5">
        <Col lg={8}>
          <Card className="shadow-sm">
            <Card.Header className="fw-bold bg-primary text-white">Hoạt Động Mới Nhất</Card.Header>
            <Card.Body>
              <ul className="recent-activities">
                {recentOrders.length > 0 ? recentOrders.map((order, index) => (
                  <li key={index}>Đơn hàng mới: <strong>#{order.id}</strong> với {order.products_count} sản phẩm.</li>
                )) : <li>Không có đơn hàng mới.</li>}
              </ul>
              <ul className="recent-activities">
                {recentProducts.length > 0 ? recentProducts.map((product, index) => (
                  <li key={index}>Người dùng {product.user?.name || 'Không có thông tin người dùng'} đã thêm sản phẩm mới: <strong>{product.name}</strong></li>
                )) : <li>Không có sản phẩm mới.</li>}
              </ul>
              <Button variant="primary" className="mt-3">
                Xem Tất Cả Hoạt Động
              </Button>
            </Card.Body>
          </Card>
        </Col>

        {/* System Stats */}
        <Col lg={4}>
          <Card className="shadow-sm">
            <Card.Header className="fw-bold bg-secondary text-white">Thông Số Hệ Thống</Card.Header>
            <Card.Body>
              <h6>Sử Dụng Máy Chủ</h6>
              <ProgressBar now={75} className="mb-3" />
              <h6>Sử Dụng Cơ Sở Dữ Liệu</h6>
              <ProgressBar now={60} className="mb-3" variant="warning" />
              <h6>Băng Thông</h6>
              <ProgressBar now={50} className="mb-3" variant="info" />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminDashboard;
