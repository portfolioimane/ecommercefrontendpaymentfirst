import React, { useState } from 'react';
import { Form } from 'react-bootstrap';

const ProductFilter = ({ onFilter }) => {
    const [category, setCategory] = useState('');

    const handleFilterChange = (e) => {
        setCategory(e.target.value);
        onFilter(e.target.value);
    };

    return (
        <Form.Group controlId="productFilter">
            <Form.Label>Filter by Category</Form.Label>
            <Form.Control as="select" value={category} onChange={handleFilterChange}>
                <option value="">All</option>
                <option value="electronics">Electronics</option>
                <option value="clothing">Clothing</option>
                <option value="accessories">Accessories</option>
            </Form.Control>
        </Form.Group>
    );
};

export default ProductFilter;
