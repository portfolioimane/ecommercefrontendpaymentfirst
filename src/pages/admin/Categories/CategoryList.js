import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from '../../../axios';
import { setCategories, deleteCategory } from '../../../redux/admin/categorySlice';
import { Button, Table, Spinner, Alert } from 'react-bootstrap';

const CategoryList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Initialize useNavigate
    const categories = useSelector(state => state.categories.items);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('/api/admin/categories');
                dispatch(setCategories(response.data));
            } catch (error) {
                console.error('Error fetching categories:', error);
                setError('Failed to fetch categories. Please try again.');
            } finally {
                setLoading(false);
            }
        };
        fetchCategories();
    }, [dispatch]);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this category?')) {
            try {
                await axios.delete(`/api/admin/categories/${id}`);
                dispatch(deleteCategory(id));
            } catch (error) {
                console.error('Error deleting category:', error);
                setError('Failed to delete category. Please try again.');
            }
        }
    };

    if (loading) {
        return <Spinner animation="border" />;
    }

    if (error) {
        return <Alert variant="danger">{error}</Alert>;
    }

    return (
        <div>
            <h1>Category List</h1>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map(category => (
                        <tr key={category.id}>
                            <td>{category.id}</td>
                            <td>{category.name}</td>
                            <td>
                                <Button 
                                    variant="warning" 
                                    onClick={() => navigate(`/admin/category/${category.id}`)} // Navigate to edit page
                                >
                                    Edit
                                </Button>
                                <Button 
                                    variant="danger" 
                                    onClick={() => handleDelete(category.id)}
                                    style={{ marginLeft: '10px' }} // Add margin for better spacing
                                >
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default CategoryList;
