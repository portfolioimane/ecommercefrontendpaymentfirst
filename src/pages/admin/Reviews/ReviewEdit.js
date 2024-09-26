import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { updateReview } from '../../../redux/admin/reviewSlice';
import { Button, Form } from 'react-bootstrap';

const ReviewEdit = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [reviewContent, setReviewContent] = useState('');

    useEffect(() => {
        const fetchReview = async () => {
            try {
                const response = await axios.get(`/api/admin/reviews/${id}`);
                setReviewContent(response.data.content);
            } catch (error) {
                console.error('Error fetching review:', error);
            }
        };
        fetchReview();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`/api/admin/reviews/${id}`, { content: reviewContent });
            dispatch(updateReview(response.data));
        } catch (error) {
            console.error('Error updating review:', error);
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
            <Button type="submit">Update Review</Button>
        </Form>
    );
};

export default ReviewEdit;
