import React, { useState } from 'react';
import './ContactPage.css';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const ContactPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate form submission (you can replace this with actual API call)
        if (formData.name && formData.email && formData.message) {
            setSubmitted(true);
            setError('');
            console.log('Form submitted:', formData);
            // Here you would typically send formData to your server
        } else {
            setError('All fields are required!');
        }
    };

    return (
        <div className="contact-container">
            <div className="contact-info">
                <h1 className="contact-title">Contact Us</h1>
                <div className="contact-item">
                    <FaPhoneAlt className="contact-icon" />
                    <p className="contact-text">+123 456 7890</p>
                </div>
                <div className="contact-item">
                    <FaEnvelope className="contact-icon" />
                    <p className="contact-text">support@example.com</p>
                </div>
                <div className="contact-item">
                    <FaMapMarkerAlt className="contact-icon" />
                    <p className="contact-text">123 E-commerce St, Shop City, Country</p>
                </div>
            </div>
            <div className="contact-form-container">
                <h2>Get in Touch</h2>
                <form onSubmit={handleSubmit} className="contact-form">
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="message">Message</label>
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit" className="contact-button">Send Message</button>
                    {submitted && <p className="success-message">Thank you for contacting us! We will get back to you soon.</p>}
                    {error && <p className="error-message">{error}</p>}
                </form>
            </div>
        </div>
    );
};

export default ContactPage;
