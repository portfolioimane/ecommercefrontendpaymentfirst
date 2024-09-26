// DashboardLayout.js
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Sidebar from './Sidebar'; 
import './DashboardLayout.css'; // Ensure this path is correct
import { Outlet } from 'react-router-dom'; // Import Outlet

const DashboardLayout = ({ newOrderCount }) => {
  return (
    <Container fluid>
      <Row>
        <Col xs={3} className="sidebar-col">
          <Sidebar />
        </Col>
        <Col xs={9} className="content-col">
          <Container className="content-container">
            <Outlet /> {/* Render nested routes */}
          </Container>
        </Col>
      </Row>
    </Container>
  );
};

export default DashboardLayout;
