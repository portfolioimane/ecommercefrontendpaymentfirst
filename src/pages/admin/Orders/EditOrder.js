import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../../../axios';
import { Button, Form, Alert, Spinner } from 'react-bootstrap';

const EditOrder = () => {
    const { id } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const response = await axios.get(`/api/admin/orders/${id}`);
                setOrder(response.data);
            } catch (error) {
                setError('Error fetching order. Please try again later.');
                console.error('Error fetching order:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchOrder();
    }, [id]);

    const handleStatusChange = async (e) => {
        const newStatus = e.target.value;
        try {
            await axios.put(`/api/admin/orders/${id}`, { status: newStatus });
            alert('Order status updated successfully!');
            navigate('/admin/orders'); // Redirect back to order list after updating
        } catch (error) {
            setError('Error updating order status. Please try again later.');
            console.error('Error updating order status:', error);
        }
    };

    if (loading) return <Spinner animation="border" variant="primary" />;
    if (error) return <Alert variant="danger">{error}</Alert>;
    if (!order) return <div>Order not found.</div>;

    return (
        <div>
            <h1>Edit Order ID: {order.id}</h1>
            <Form>
                <Form.Group controlId="orderStatus">
                    <Form.Label>Status</Form.Label>
                    <Form.Select value={order.status} onChange={handleStatusChange}>
                        <option value="Pending">Pending</option>
                        <option value="Processing">Processing</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                    </Form.Select>
                </Form.Group>
                <Button variant="primary" onClick={() => navigate('/admin/orders')} style={{ marginRight: '10px' }}>
                    Save Changes
                </Button>
                <Button variant="secondary" onClick={() => navigate('/admin/orders')}>
                    Cancel
                </Button>
            </Form>
        </div>
    );
};

export default EditOrder;
