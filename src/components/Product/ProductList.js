import React from 'react';
import { useSelector } from 'react-redux';
import Product from './Product';
import { Row, Col } from 'react-bootstrap';

const ProductList = ({ filter }) => {
    const products = useSelector(state => state.products.products);

    const filteredProducts = filter ? 
        products.filter(product => product.category === filter) : products;

    return (
        <Row>
            {filteredProducts.map(product => (
                <Col key={product.id} xs={12} sm={6} md={4}>
                    <Product product={product} />
                </Col>
            ))}
        </Row>
    );
};

export default ProductList;
