import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from '../../../axios';
import { addProduct } from '../../../redux/admin/productSlice';
import { Button, Form, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const ProductCreate = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Initialize useNavigate for redirection
    const [productName, setProductName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null); // State for image preview
    const [categories, setCategories] = useState([]);
    const [successMessage, setSuccessMessage] = useState(''); // State for success message
    const [errorMessage, setErrorMessage] = useState(''); // State for error message

    // Fetch categories when component mounts
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('/api/admin/categories'); // API to fetch categories
                setCategories(response.data); // Assuming the API returns an array of categories
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
        
        // Show image preview
        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result);
        };
        if (file) {
            reader.readAsDataURL(file);
        } else {
            setImagePreview(null);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', productName);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('stock', stock);
        formData.append('category_id', categoryId); // Send category ID, not name
        if (image) {
            formData.append('image', image);
        }

        try {
            const response = await axios.post('/api/admin/products', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            dispatch(addProduct(response.data));

            // Set success message
            setSuccessMessage('Product created successfully!');
            setErrorMessage('');

            // Reset the form fields
            setProductName('');
            setDescription('');
            setPrice('');
            setStock('');
            setCategoryId('');
            setImage(null);
            setImagePreview(null);

            // Redirect to product list after 2 seconds
            setTimeout(() => {
                navigate('/admin/products'); // Adjust this path to your product list route
            }, 2000);
        } catch (error) {
            console.error('Error creating product:', error);
            setErrorMessage('There was an error creating the product.');
            setSuccessMessage('');
        }
    };

    return (
        <div className="product-create-container">
            <h1>Create Product</h1>
            <Form onSubmit={handleSubmit}>
                {successMessage && <Alert variant="success">{successMessage}</Alert>}
                {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

                <Form.Group>
                    <Form.Label>Product Name</Form.Label>
                    <Form.Control
                        type="text"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                        type="number"
                        step="0.01"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Stock</Form.Label>
                    <Form.Control
                        type="number"
                        value={stock}
                        onChange={(e) => setStock(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Category</Form.Label>
                    <Form.Control
                        as="select"
                        value={categoryId}
                        onChange={(e) => setCategoryId(e.target.value)}
                        required
                    >
                        <option value="">Select Category</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </Form.Control>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Image</Form.Label>
                    <Form.Control
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                    {imagePreview && (
                        <div>
                            <img 
                                src={imagePreview} 
                                alt="Preview" 
                                style={{ 
                                    width: '150px', 
                                    height: '150px', 
                                    objectFit: 'cover', 
                                    display: 'block', 
                                }} 
                            />
                        </div>
                    )}
                </Form.Group>

                <Button type="submit">Create Product</Button>
            </Form>
        </div>
    );
};

export default ProductCreate;
