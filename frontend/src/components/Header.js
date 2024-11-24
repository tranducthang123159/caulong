import React from 'react';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Header.css'; // Optional custom CSS for additional styling

const Header = () => {
  return (
    <Navbar bg="primary" expand="lg" variant="dark" className="shadow-sm">
      <Container fluid>
        {/* Brand */}
        <Navbar.Brand as={Link} to="/admin" className="fw-bold">
          <img
            src="/logo.png"
            alt="Admin Logo"
            style={{ width: '40px', height: '40px', marginRight: '10px' }}
          />
          Admin Panel
        </Navbar.Brand>

        {/* Responsive Toggle Button */}
        <Navbar.Toggle aria-controls="admin-navbar" />

        {/* Collapsible Menu */}
        <Navbar.Collapse id="admin-navbar">
          <Nav className="ms-auto">
            {/* Home Link */}
            <Nav.Link as={Link} to="/admin" className="fw-semibold">
              Trang Chủ
            </Nav.Link>

            {/* Dropdown Menu for User */}
            <NavDropdown
              title={<span className="fw-semibold">Tài Khoản</span>}
              id="user-dropdown"
              align="end"
              menuVariant="dark"
            >
              <NavDropdown.Item as={Link} to="/profile">
                Hồ Sơ
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/sign-out">
                Đăng Xuất
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
