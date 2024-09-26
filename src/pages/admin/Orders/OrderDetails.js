import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { setOrders } from '../../../redux/orderSlice';
import { Table } from 'react-bootstrap';

const OrderDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const order = useSelector(state => state.orders.items.find(order => order.id === parseInt(id)));

    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                const response = await axios.get(`/api/admin/orders/${id}`);
                dispatch(setOrders([response.data]));
            } catch (error) {
                console.error('Error fetching order details:', error);
            }
        };
        fetchOrderDetails();
    }, [id, dispatch]);

    if (!order) return <div>Loading...</div>;

    return (
        <div>
            <h1>Order Details for Order ID: {order.id}</h1>
            <h3>Name: {order.name}</h3>
            <h3>Email: {order.email}</h3>
            <h3>Total Price: ${order.total_price}</h3>
            <h3>Payment Method: {order.payment_method}</h3>
            <h3>Status: {order.status}</h3>
            <h4>Items:</h4>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Product Name</th>
                        <th>Quantity</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {order.items.map(item => (
                        <tr key={item.id}>
                            <td>{item.product.name}</td>
                            <td>{item.quantity}</td>
                            <td>${item.price}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default OrderDetails;
