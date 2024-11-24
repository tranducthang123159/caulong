import React from 'react';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <Container fluid>
      <Row>
        {/* Sidebar */}
        <Col md={2} className="bg-dark text-white p-3" style={{ height: '100vh' }}>
          <h4>Sleek Dashboard</h4>
          <Nav className="flex-column">
            <Nav.Item>
              <Nav.Link as={Link} to="/" className="text-white">Dashboard</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to="/ecommerce" className="text-white">Ecommerce</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to="/analytics" className="text-white">Analytics</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to="/components" className="text-white">Components</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to="/forms" className="text-white">Forms</Nav.Link>
            </Nav.Item>
            {/* Add other sidebar links here */}
          </Nav>
        </Col>

        {/* Main Content */}
        <Col md={10} className="p-4">
          <h2>Dashboard Content</h2>
          <p>Here you can display the main content, charts, tables, and more.</p>
          {/* Add other sections here */}
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
