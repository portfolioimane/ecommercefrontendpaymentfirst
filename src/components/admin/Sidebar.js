import React, { useState } from 'react';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Sidebar.css';
import { FaChevronDown, FaChevronUp, FaHome, FaBox, FaTags, FaShoppingCart, FaUsers, FaStar, FaCog } from 'react-icons/fa';

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState({});

    const toggleDropdown = (section) => {
        setIsOpen((prevState) => ({ ...prevState, [section]: !prevState[section] }));
    };

    return (
        <div className="sidebar">
            <h2>Admin Dashboard</h2>
            <Nav className="flex-column">
                <Nav.Link as={Link} to="/admin/dashboard">
                    <FaHome /> Dashboard
                </Nav.Link>

                     <Nav.Link onClick={() => toggleDropdown('categories')}>
                    <FaTags /> Categories {isOpen.categories ? <FaChevronUp /> : <FaChevronDown />}
                </Nav.Link>
                {isOpen.categories && (
                    <div className="dropdown">
                        <Nav.Link as={Link} to="/admin/categories">Category List</Nav.Link>
                        <Nav.Link as={Link} to="/admin/categories/create">Add Category</Nav.Link>
                    </div>
                )}

                <Nav.Link onClick={() => toggleDropdown('products')}>
                    <FaBox /> Products {isOpen.products ? <FaChevronUp /> : <FaChevronDown />}
                </Nav.Link>
                {isOpen.products && (
                    <div className="dropdown">
                        <Nav.Link as={Link} to="/admin/products">Product List</Nav.Link>
                        <Nav.Link as={Link} to="/admin/products/create">Add Product</Nav.Link>
                    </div>
                )}

           

                <Nav.Link onClick={() => toggleDropdown('orders')}>
                    <FaShoppingCart /> Orders {isOpen.orders ? <FaChevronUp /> : <FaChevronDown />}
                </Nav.Link>
                {isOpen.orders && (
                    <div className="dropdown">
                        <Nav.Link as={Link} to="/admin/orders">Order List</Nav.Link>
                    </div>
                )}

                <Nav.Link onClick={() => toggleDropdown('users')}>
                    <FaUsers /> Users {isOpen.users ? <FaChevronUp /> : <FaChevronDown />}
                </Nav.Link>
                {isOpen.users && (
                    <div className="dropdown">
                        <Nav.Link as={Link} to="/admin/users">User List</Nav.Link>
                        <Nav.Link as={Link} to="/admin/users/create">Add User</Nav.Link>
                    </div>
                )}

                <Nav.Link onClick={() => toggleDropdown('reviews')}>
                    <FaStar /> Reviews {isOpen.reviews ? <FaChevronUp /> : <FaChevronDown />}
                </Nav.Link>
                {isOpen.reviews && (
                    <div className="dropdown">
                        <Nav.Link as={Link} to="/admin/reviews">Review List</Nav.Link>
                        <Nav.Link as={Link} to="/admin/reviews/create">Add Review</Nav.Link>
                    </div>
                )}

                <Nav.Link as={Link} to="/admin/settings">
                    <FaCog /> Settings
                </Nav.Link>
            </Nav>
        </div>
    );
};

export default Sidebar;
