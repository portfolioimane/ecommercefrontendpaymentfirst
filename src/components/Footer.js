import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-4">
      <Container>
        <Row>
          <Col md={6}>
            <h5>Contact Us</h5>
            <p>123 Shop, Toothville</p>
            <p>Email: contact@shop.com</p>
            <p>Phone: +123 456 789</p>
          </Col>
          <Col md={6}>
            <h5>Follow Us</h5>
            <p>Facebook | Twitter | Instagram</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;