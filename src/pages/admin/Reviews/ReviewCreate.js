import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { addReview } from '../../../redux/admin/reviewSlice';
import { Button, Form } from 'react-bootstrap';

const ReviewCreate = () => {
    const dispatch = useDispatch();
    const [reviewContent, setReviewContent] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/admin/reviews', { content: reviewContent });
            dispatch(addReview(response.data));
            setReviewContent('');
        } catch (error) {
            console.error('Error creating review:', error);
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label>Review Content</Form.Label>
                <Form.Control
                    type="text"
                    value={reviewContent}
                    onChange={(e) => setReviewContent(e.target.value)}
                    required
                />
            </Form.Group>
            <Button type="submit">Create Review</Button>
        </Form>
    );
};

export default ReviewCreate;
