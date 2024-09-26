import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from '../../../axios';
import { setOrders, addOrder } from '../../../redux/admin/orderSlice';
import { Button, Table, Form, Spinner, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Pusher from 'pusher-js';

const OrderList = () => {
    const dispatch = useDispatch();
    const orders = useSelector(state => state.orders.items || []); // Ensure it's an array
    const navigate = useNavigate();
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);
    console.log('orders items', orders);
    
    React.useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get('/api/admin/orders');
                dispatch(setOrders(response.data)); // Set initial orders in Redux state
                setLoading(false);
            } catch (error) {
                setError('Error fetching orders. Please try again later.');
                console.error('Error fetching orders:', error);
                setLoading(false);
            }
        };

        fetchOrders();

        const pusher = new Pusher(process.env.REACT_APP_PUSHER_KEY, {
            cluster: process.env.REACT_APP_PUSHER_CLUSTER,
        });

        const channel = pusher.subscribe('orders');

        // Bind the OrderPlaced event
        channel.bind('OrderPlaced', (data) => {
            console.log('New order received:', data);
            if (data && data.order) {
                dispatch(addOrder(data.order)); // This will push the new order to the existing list
            } else {
                console.error('Invalid order data:', data);
            }
        });

        channel.bind('pusher:subscription_succeeded', () => {
            console.log('Successfully subscribed to orders channel');
        });

        channel.bind('pusher:subscription_error', (status) => {
            console.error('Subscription error:', status);
        });

        return () => {
            channel.unbind_all();
            channel.unsubscribe();
        };
    }, [dispatch]);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this order?')) {
            try {
                await axios.delete(`/api/admin/orders/${id}`);
                const updatedOrders = orders.filter(order => order.id !== id);
                dispatch(setOrders(updatedOrders));
            } catch (error) {
                setError('Error deleting order. Please try again later.');
                console.error('Error deleting order:', error);
            }
        }
    };

    const handleStatusChange = async (id, newStatus) => {
        try {
            await axios.put(`/api/admin/orders/${id}`, { status: newStatus });
            alert('Order status updated successfully!');
            const response = await axios.get('/api/admin/orders');
            dispatch(setOrders(response.data)); // Refresh orders after update
        } catch (error) {
            setError('Error updating order status. Please try again later.');
            console.error('Error updating order status:', error);
        }
    };

    if (loading) return <Spinner animation="border" variant="primary" />;
    if (error) return <Alert variant="danger">{error}</Alert>;
    if (!orders.length) return <div>No orders found.</div>;

    return (
        <div>
            <h1 className="text-center my-4">Order List</h1>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Address</th>
                        <th>Total Price</th>
                        <th>Payment Method</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => (
                        <tr key={order.id}>
                            <td>{order.id}</td>
                            <td>{order.name}</td>
                            <td>{order.email}</td>
                            <td>{order.phone}</td>
                            <td>{order.address}</td>
                            <td>{order.total_price} MAD</td>
                            <td>{order.payment_method}</td>
                            <td>
                                <Form.Select 
                                    value={order.status} 
                                    onChange={(e) => handleStatusChange(order.id, e.target.value)} 
                                    style={{ width: '150px' }} // Add your desired width
                                >
                                    <option value="pending">Pending</option>
                                    <option value="completed">Completed</option>
                                    <option value="cancelled">Cancelled</option>
                                </Form.Select>
                            </td>
                            <td>
                                <Button variant="danger" onClick={() => handleDelete(order.id)}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default OrderList;
