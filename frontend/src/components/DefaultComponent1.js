// src/components/DefaultComponent.js
import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { Container, Row, Col } from 'react-bootstrap';

const DefaultComponent = ({ children }) => {
  return (
    <div>
      <Header />
      <Container fluid>
        <Row>
          <Col md={3}>
            <Sidebar />
          </Col>
          <Col md={9}>
            {children}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default DefaultComponent;
