import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from '../../../axios';
import { setProducts, deleteProduct } from '../../../redux/admin/productSlice';
import { Button, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const ProductList = () => {
    const dispatch = useDispatch();
    const products = useSelector(state => state.products.items);
    const navigate = useNavigate(); // Initialize useNavigate

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('/api/admin/products');
                dispatch(setProducts(response.data));
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchProducts();
    }, [dispatch]);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/api/admin/products/${id}`);
            dispatch(deleteProduct(id));
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    return (
        <div>
            <h1>Product List</h1>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Stock</th>
                        <th>Category</th>
                        <th>Image</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.name}</td>
                            <td>{product.description}</td>
                            <td>{product.price}</td>
                            <td>{product.stock}</td>
                            <td>{product.category?.name}</td>
                            <td>
                                {product.image && (
                                    <img
                                        src={`${process.env.REACT_APP_API_URL}/storage/${product.image}`} // Use environment variable here
                                        alt={product.name}
                                        style={{ width: '50px', height: '50px' }}
                                    />
                                )}
                            </td>
                            <td>
                                <Button variant="warning" onClick={() => navigate(`/admin/product/${product.id}`)}>
                                    Edit
                                </Button>
                                <Button 
                                    variant="danger" 
                                    onClick={() => handleDelete(product.id)} 
                                    style={{ marginLeft: '10px' }}
                                >
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default ProductList;
