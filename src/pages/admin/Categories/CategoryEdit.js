import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from '../../../axios';
import { updateCategory } from '../../../redux/admin/categorySlice';
import { Button, Form, Alert } from 'react-bootstrap';

const CategoryEdit = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Create navigate function
    const [categoryName, setCategoryName] = useState('');
    const [error, setError] = useState(null); // State for error handling

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const response = await axios.get(`/api/admin/categories/${id}`);
                setCategoryName(response.data.name);
            } catch (error) {
                console.error('Error fetching category:', error);
                setError('Failed to fetch category. Please try again.'); // Set error message
            }
        };
        fetchCategory();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`/api/admin/categories/${id}`, { name: categoryName });
            dispatch(updateCategory(response.data));
            navigate('/admin/categories'); // Redirect to categories list after update
        } catch (error) {
            console.error('Error updating category:', error);
            setError('Failed to update category. Please try again.'); // Set error message
        }
    };

    return (
        <div>
            <h1>Edit Category</h1>
            {error && <Alert variant="danger">{error}</Alert>} {/* Display error message */}
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
                <Button type="submit">Update Category</Button>
            </Form>
        </div>
    );
};

export default CategoryEdit;
