import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Product = ({ product }) => {
    return (
        <Card style={{ margin: '1rem' }}>
            <Card.Img variant="top" src={product.image} />
            <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>Price: {product.price} MAD</Card.Text>
                <Link to={`/product/${product.id}`}>
                    <Button variant="primary">View Details</Button>
                </Link>
            </Card.Body>
        </Card>
    );
};

export default Product;
