import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Updated for v6
import store from './redux/store';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderPage from './pages/OrderPage';
import OrderDetailsPage from './pages/OrderDetailsPage';

import ContactPage from './pages/ContactPage';
import ThankYouPage from './pages/ThankYouPage';
import ProductDetailPage from './pages/ProductDetailPage';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';

import Dashboard from './pages/admin/Dashboard';

import ProductList from './pages/admin/Products/ProductList';
import ProductCreate from './pages/admin/Products/ProductCreate';
import ProductEdit from './pages/admin/Products/ProductEdit';


import CategoryList from './pages/admin/Categories/CategoryList';
import CategoryEdit from './pages/admin/Categories/CategoryEdit';
import CategoryCreate from './pages/admin/Categories/CategoryCreate';

import OrderList from './pages/admin/Orders/OrderList';
import OrderDetails from './pages/admin/Orders/OrderDetails';
import EditOrder from './pages/admin/Orders/EditOrder';


import UserList from './pages/admin/Users/UserList';
import ReviewList from './pages/admin/Reviews/ReviewList';
import Settings from './pages/admin/Settings';
import PublicLayout from './components/PublicLayout';
import MyOrderLayout from './components/MyOrderLayout';

import AdminRoute from './components/AdminRoute';
import DashboardLayout from './components/admin/DashboardLayout';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
    return (
        <Provider store={store}>
            <Router>
            
            
                    <Routes>
                    <Route element={<PublicLayout />}>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/shop" element={<ShopPage />} />
                        <Route path="/product/:id" element={<ProductDetailPage />} />
                        <Route path="/cart" element={<CartPage />} />
                        <Route path="/checkout" element={<CheckoutPage />} />
                        <Route path="/thank-you/order/:id" element={<ThankYouPage />} />

                   <Route  element={<MyOrderLayout />}>
                        <Route path="/orders" element={<OrderPage />} />
                        <Route path="/orders/order-details/:id" element={<OrderDetailsPage />} />
                    </Route>
                     
                        <Route path="/contact" element={<ContactPage />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                    </Route>
                    
              

                <Route element={<AdminRoute />}>
                <Route path="/admin" element={<DashboardLayout />}>
                    
                       
                        <Route path="/admin/dashboard" element={<Dashboard />} />
                        
                        <Route path="/admin/products" element={<ProductList />} />
                        <Route path="/admin/product/:id" element={<ProductEdit />} />
                        <Route path="/admin/products/create" element={<ProductCreate />} />


                        <Route path="/admin/categories" element={<CategoryList />} />
                        <Route path="/admin/category/:id" element={<CategoryEdit />} />
                        <Route path="/admin/categories/create" element={<CategoryCreate />} />

                        <Route path="/admin/orders" element={<OrderList />} />
                        <Route path="/admin/orders/:id" element={<OrderDetails />} />
                        <Route path="/admin/orders/edit/:id" element={<EditOrder />} />
                        
                        <Route path="/admin/users" element={<UserList />} />
                        <Route path="/admin/reviews" element={<ReviewList />} />
                        <Route path="/admin/settings" element={<Settings />} />
                </Route>
                </Route>
                    </Routes>

                
            </Router>
        </Provider>
    );
};

export default App;
