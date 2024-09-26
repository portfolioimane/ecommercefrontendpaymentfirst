import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from '../../../axios';
import { addCategory } from '../../../redux/admin/categorySlice';
import { Button, Form } from 'react-bootstrap';

const CategoryCreate = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Create navigate function
    const [categoryName, setCategoryName] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/admin/categories', { name: categoryName });
            dispatch(addCategory(response.data));
            setCategoryName('');

            // Redirect to categories list after successful creation
            navigate('/admin/categories');
        } catch (error) {
            console.error('Error creating category:', error);
        }
    };

    return (
        <div className="category-create-container">
            <h1>Create Category</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Category Name</Form.Label>
                    <Form.Control
                        type="text"
                        value={categoryName}
                        onChange={(e) => setCategoryName(e.target.value)}
                        required
                    />
                </Form.Group>
                <Button type="submit">Create Category</Button>
            </Form>
        </div>
    );
};

export default CategoryCreate;
