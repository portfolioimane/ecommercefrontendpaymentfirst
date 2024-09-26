import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setProducts } from '../redux/productSlice';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import Slider from 'react-slick';
import { FaEye, FaShippingFast, FaCheckCircle, FaMoneyBillWave } from 'react-icons/fa';
import axios from '../axios';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './HomePage.css';

const HomePage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const products = useSelector((state) => state.products.items);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    };

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('/api/products');
                dispatch(setProducts(response.data));
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, [dispatch]);

    const defaultImage = 'https://via.placeholder.com/300';

    return (
        <Container className="my-5">
            {/* Welcome Section */}
            <Row>
                <Col>
                    <h1 className="text-center mb-4" style={{ color: '#212529', fontFamily: 'Arial, sans-serif', fontWeight: 'bold' }}>Welcome to E-Shop!</h1>
                    <p className="text-center mb-5" style={{ color: '#212529', fontSize: '1.2em' }}>Discover amazing products at great prices.</p>
                </Col>
            </Row>

            {/* Carousel Section */}
            <Row>
                <Col>
                    <Slider {...settings} className="mb-4">
                        <div>
                            <img src="/path/to/your/image1.jpg" alt="Sale 1" className="img-fluid rounded" />
                        </div>
                        <div>
                            <img src="/path/to/your/image2.jpg" alt="Sale 2" className="img-fluid rounded" />
                        </div>
                        <div>
                            <img src="/path/to/your/image3.jpg" alt="Sale 3" className="img-fluid rounded" />
                        </div>
                    </Slider>
                </Col>
            </Row>

            {/* Quality, Shipping, and Payment Section */}
            <Row className="text-center services mb-5 mt-4">
                <Col md={4}>
                    <div className="icon-container">
                        <FaCheckCircle className="icon" />
                        <h4 style={{ color: '#e6b800', fontWeight: 'bold' }}>Quality Products</h4>
                        <p>Your satisfaction is our priority.</p>
                    </div>
                </Col>
                <Col md={4}>
                    <div className="icon-container">
                        <FaShippingFast className="icon" />
                        <h4 style={{ color: '#e6b800', fontWeight: 'bold' }}>Free Shipping</h4>
                        <p>On all orders over $50.</p>
                    </div>
                </Col>
                <Col md={4}>
                    <div className="icon-container">
                        <FaMoneyBillWave className="icon" />
                        <h4 style={{ color: '#e6b800', fontWeight: 'bold' }}>Cash on Delivery</h4>
                        <p>Pay when you receive your order.</p>
                    </div>
                </Col>
            </Row>

            {/* Featured Products Section */}
            <Row>
                <Col>
                    <h2 className="text-center mb-4" style={{ color: '#212529', fontFamily: 'Arial, sans-serif', fontWeight: 'bold' }}>Featured Products</h2>
                </Col>
            </Row>
            <Row>
                {products.map((product) => (
                    <Col md={4} key={product.id} className="mb-4">
                        <Card className="product-card shadow-sm border-light hover-shadow">
                            <Card.Img 
    variant="top" 
    alt={product.name}
    src={`${process.env.REACT_APP_API_URL}/storage/${product.image}`} 
    style={{ width: '100%', height: '250px', objectFit: 'cover' }} // Set width and height
/>

                            <Card.Body>
                                <Card.Title>{product.name}</Card.Title>
                                <Card.Text>${product.price}</Card.Text>
                                <Button 
                                    className="w-100 btn-custom" 
                                    onClick={() => navigate(`/product/${product.id}`)}
                                >
                                    <FaEye /> View Product
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

            {/* Space between sections */}
            <div style={{ margin: '40px 0' }}></div>

            {/* Testimonials Section */}
            <Row className="mt-5 mb-4">
                <Col>
                    <h2 className="text-center mb-4" style={{ color: '#212529', fontFamily: 'Arial, sans-serif', fontWeight: 'bold' }}>What Our Customers Say</h2>
                </Col>
            </Row>
            <Row>
                {['Great service and fast shipping!', 'Amazing quality products at great prices!', 'I love shopping here!'].map((testimonial, index) => (
                    <Col md={4} className="text-center mb-4" key={index}>
                        <div className="testimonial-card p-3 border rounded shadow-sm">
                            <blockquote className="blockquote">
                                <p>{testimonial}</p>
                                <footer className="blockquote-footer">Customer {index + 1}</footer>
                            </blockquote>
                        </div>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default HomePage;
