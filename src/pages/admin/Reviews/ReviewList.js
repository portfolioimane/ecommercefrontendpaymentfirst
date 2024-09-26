import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setReviews, deleteReview } from '../../../redux/admin/reviewSlice';
import { Button } from 'react-bootstrap';

const ReviewList = () => {
    const dispatch = useDispatch();
    const reviews = useSelector(state => state.reviews.items);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await axios.get('/api/admin/reviews');
                dispatch(setReviews(response.data));
            } catch (error) {
                console.error('Error fetching reviews:', error);
            }
        };
        fetchReviews();
    }, [dispatch]);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/api/admin/reviews/${id}`);
            dispatch(deleteReview(id));
        } catch (error) {
            console.error('Error deleting review:', error);
        }
    };

    return (
        <div>
            <h1>Review List</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Content</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {reviews.map(review => (
                        <tr key={review.id}>
                            <td>{review.id}</td>
                            <td>{review.content}</td>
                            <td>
                                <Button onClick={() => handleDelete(review.id)}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ReviewList;
