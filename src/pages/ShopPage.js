import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setProducts } from '../redux/productSlice';
import axios from '../axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './ShopPage.css';

const ShopPage = () => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products.items);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('/api/products');
                dispatch(setProducts(response.data));
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        const fetchCategories = async () => {
            try {
                const response = await axios.get('/api/categories'); // Assuming you have this endpoint
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchProducts();
        fetchCategories();
    }, [dispatch]);

    const handleCategoryClick = (categoryId) => {
        // Set selected category or show all products
        setSelectedCategory(prevCategory => prevCategory === categoryId ? '' : categoryId);
    };

    const showAllProducts = () => {
        setSelectedCategory(''); // Show all products
    };

    // Filter products based on selected category
    const filteredProducts = selectedCategory
        ? products.filter(product => product.category_id.toString() === selectedCategory)
        : products;

    // Navigate to product detail page
    const handleViewDetails = (productId) => {
        navigate(`/product/${productId}`);
    };

    return (
        <div className="shop-container">
            <h1 className="shop-title">Shop Our Products</h1>
            <div className="shop-layout">
                <div className="filter-column">
                    <h2 className="filter-title">Categories</h2>
                    <div className="category-list">
                        <button 
                            className={`category-button ${selectedCategory === '' ? 'active' : ''}`} 
                            onClick={showAllProducts}
                        >
                            All Categories
                        </button>
                        {categories.map(category => (
                            <button
                                key={category.id}
                                className={`category-button ${selectedCategory === category.id.toString() ? 'active' : ''}`}
                                onClick={() => handleCategoryClick(category.id.toString())} // Ensure categoryId is a string
                            >
                                {category.name}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="product-list">
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map(product => (
                            <div key={product.id} className="product-card">
                                <img 
                            src={`${process.env.REACT_APP_API_URL}/storage/${product.image}`} // Use environment variable here
                                alt={product.name} className="product-image"  />
                                <h2 className="product-name">{product.name}</h2>
                                <p className="product-category">{categories.find(cat => cat.id === product.category_id)?.name || 'Unknown Category'}</p>
                                <p className="product-description">{product.description}</p>
                                <p className="product-price">
                                    ${Number(product.price).toFixed(2)} {/* Ensure price is a number */}
                                </p>
                                <button 
                                    className="product-button" 
                                    onClick={() => handleViewDetails(product.id)} // Navigate to product detail page
                                >
                                    View Details
                                </button>
                            </div>
                        ))
                    ) : (
                        <p>No products available in this category.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ShopPage;
