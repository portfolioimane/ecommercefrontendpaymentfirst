import React from 'react';
import { Card, Button } from 'react-bootstrap';

const ProductDetail = ({ product, onAddToCart }) => {
    return (
        <Card style={{ width: '100%', margin: '1rem' }}>
            <Card.Img variant="top" src={product.image} />
            <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>{product.description}</Card.Text>
                <Card.Text>Price: {product.price} MAD</Card.Text>
                <Button variant="primary" onClick={() => onAddToCart(product)}>Add to Cart</Button>
            </Card.Body>
        </Card>
    );
};

export default ProductDetail;
