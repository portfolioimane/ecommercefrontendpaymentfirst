import React from 'react';
import OrderItem from './OrderItem';
import { useSelector } from 'react-redux';

const Order = () => {
    const orders = useSelector(state => state.orders.items);

    return (
        <div>
            <h2>Your Orders</h2>
            {orders.map(order => (
                <OrderItem key={order.id} order={order} />
            ))}
        </div>
    );
};

export default Order;
