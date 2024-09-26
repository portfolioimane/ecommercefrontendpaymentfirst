import React from 'react';
import { Card } from 'react-bootstrap';

const OrderItem = ({ order }) => {
    return (
        <Card style={{ margin: '1rem' }}>
            <Card.Body>
                <Card.Title>Order ID: {order.id}</Card.Title>
                <Card.Text>Total Amount: {order.total} MAD</Card.Text>
                {/* Add more order details as needed */}
            </Card.Body>
        </Card>
    );
};

export default OrderItem;
