import React, { useState } from 'react';
import { Nav, Col, ProgressBar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTachometerAlt,
  faPlusSquare,
  faCogs,
  faChevronDown,
  faChevronRight,
  faThLarge, // Icon for categories
  faUser, // Icon for user management
} from '@fortawesome/free-solid-svg-icons';
import './Sidebar.css';

const Sidebar = () => {
  const [isComponentsOpen, setComponentsOpen] = useState(false);
  const [isCategoriesOpen, setCategoriesOpen] = useState(false); // State for Categories menu
  const [isUsersOpen, setUsersOpen] = useState(false); // State for Users menu

  const toggleComponentsMenu = () => {
    setComponentsOpen(!isComponentsOpen);
  };

  const toggleCategoriesMenu = () => { // Toggle Categories menu
    setCategoriesOpen(!isCategoriesOpen);
  };

  const toggleUsersMenu = () => { // Toggle Users menu
    setUsersOpen(!isUsersOpen);
  };

  return (
    <Col xs={12} md={3} className="sidebar p-0 bg-dark vh-100">
      {/* Sidebar Header */}
      <div className="sidebar-header text-center py-4">
        <h4 className="text-white fw-bold mb-0">Admin Panel</h4>
      </div>

      {/* Navigation */}
      <Nav className="flex-column mt-4">
        <Nav.Item>
          <Nav.Link as={Link} to="/admin/dashboard" className="nav-link text-white px-4 py-3  fs-3">
            <FontAwesomeIcon icon={faTachometerAlt} className="me-3" />
            Dashboard
          </Nav.Link>
        </Nav.Item>

        {/* Product Management */}
        <Nav.Item>
          <div
            onClick={toggleComponentsMenu}
            className="nav-link text-white px-4 py-3 d-flex justify-content-between align-items-center  fs-3"
            style={{ cursor: 'pointer' }}
          >
            <div>
              <FontAwesomeIcon icon={faCogs} className="me-3" />
              Product Management
            </div>
            <FontAwesomeIcon icon={isComponentsOpen ? faChevronDown : faChevronRight} />
          </div>
        </Nav.Item>

        {isComponentsOpen && (
          <div className="nested-menu">
            <Nav.Link as={Link} to="/admin/add-product" className="nested-item text-white px-5 py-2">
              Add Product
            </Nav.Link>
            <Nav.Link as={Link} to="/admin/ProductList" className="nested-item text-white px-5 py-2">
              Product List
            </Nav.Link>
          </div>
        )}

        {/* Categories Section */}
        <Nav.Item>
          <div
            onClick={toggleCategoriesMenu} // Toggle Categories menu
            className="nav-link text-white px-4 py-3 d-flex justify-content-between align-items-center  fs-3 "
            style={{ cursor: 'pointer' }}
          >
            <div>
              <FontAwesomeIcon icon={faThLarge} className="me-3" /> {/* Categories Icon */}
              Categories
            </div>
            <FontAwesomeIcon icon={isCategoriesOpen ? faChevronDown : faChevronRight} />
          </div>
        </Nav.Item>

        {isCategoriesOpen && (
          <div className="nested-menu">
            <Nav.Link as={Link} to="/admin/categories" className="nested-item text-white px-5 py-2 fs-3 ">
               Category
            </Nav.Link>
          </div>
        )}

        {/* User Management */}
        <Nav.Item>
          <div
            onClick={toggleUsersMenu} // Toggle Users menu
            className="nav-link text-white px-4 py-3 d-flex justify-content-between align-items-center  fs-3"
            style={{ cursor: 'pointer' }}
          >
            <div>
              <FontAwesomeIcon icon={faUser} className="me-3" />
              User Management
            </div>
            <FontAwesomeIcon icon={isUsersOpen ? faChevronDown : faChevronRight} />
          </div>
        </Nav.Item>

        {isUsersOpen && (
          <div className="nested-menu">
            <Nav.Link as={Link} to="/admin/user" className="nested-item text-white px-5 py-2 fs-3 ">
              User List
            </Nav.Link>
           
          </div>
        )}

      </Nav>

      {/* Stats */}
      <div className="sidebar-stats mt-auto px-4 pb-4">
        <h6 className="text-white">CPU Usage</h6>
        <ProgressBar now={40} className="mb-3" variant="info" />
        <h6 className="text-white">Memory Usage</h6>
        <ProgressBar now={65} variant="warning" />
      </div>
    </Col>
  );
};

export default Sidebar;
