import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../../../axios'; // Adjust the path as needed
import { updateProduct } from '../../../redux/admin/productSlice'; // Adjust the path as needed
import { Button, Form, Alert } from 'react-bootstrap';

const ProductEdit = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Hook for navigation

    const [productDetails, setProductDetails] = useState({
        name: '',
        description: '',
        price: '',
        stock: '',
        category_id: '',
        image: null,
    });

    const [categories, setCategories] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [imagePreview, setImagePreview] = useState(null);
    const [existingImageName, setExistingImageName] = useState('');

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('/api/admin/categories');
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        const fetchProduct = async () => {
            try {
                const response = await axios.get(`/api/admin/products/${id}`);
                setProductDetails({
                    name: response.data.name,
                    description: response.data.description,
                    price: response.data.price,
                    stock: response.data.stock,
                    category_id: response.data.category_id,
                    image: null, // Start with no image to allow upload
                });

                if (response.data.image) {
                    setImagePreview(`${process.env.REACT_APP_API_URL}/storage/${response.data.image}`);
                    setExistingImageName(response.data.image); // Set existing image name
                }
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };

        fetchCategories();
        fetchProduct();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value,
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setProductDetails((prevDetails) => ({
            ...prevDetails,
            image: file,
        }));

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

        // Append product details to FormData
        Object.entries(productDetails).forEach(([key, value]) => {
            if (value !== null) formData.append(key, value);
        });

        // Append the _method for Laravel
        formData.append('_method', 'PUT');

        try {
            const response = await axios.post(`/api/admin/products/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Ensure correct content type for FormData
                },
            });
            dispatch(updateProduct(response.data));
            setSuccessMessage('Product updated successfully!');
            setErrorMessage('');

            // Redirect to product list after successful update
            navigate('/admin/products'); // Adjust the path to your product list route
        } catch (error) {
            console.error('Error updating product:', error);
            setErrorMessage(error.response?.data?.message || 'There was an error updating the product.');
            setSuccessMessage('');
        }
    };

    return (
        <div className="product-edit-container">
            <h1>Edit Product</h1>
            <Form onSubmit={handleSubmit}>
                {successMessage && <Alert variant="success">{successMessage}</Alert>}
                {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

                <Form.Group>
                    <Form.Label>Product Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="name"
                        value={productDetails.name}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        name="description"
                        value={productDetails.description}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                        type="number"
                        name="price"
                        value={productDetails.price}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Stock</Form.Label>
                    <Form.Control
                        type="number"
                        name="stock"
                        value={productDetails.stock}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Category</Form.Label>
                    <Form.Control
                        as="select"
                        name="category_id"
                        value={productDetails.category_id}
                        onChange={handleChange}
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
                                    marginTop: '10px'
                                }} 
                            />
                        </div>
                    )}
                    {existingImageName && !imagePreview && (
                        <p>Current Image: {existingImageName}</p> // Show existing image name if no new image is selected
                    )}
                </Form.Group>

                <Button type="submit">Update Product</Button>
            </Form>
        </div>
    );
};

export default ProductEdit;
