import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { updateUser } from '../../../redux/admin/userSlice';
import { Button, Form } from 'react-bootstrap';

const UserEdit = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [userName, setUserName] = useState('');

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`/api/admin/users/${id}`);
                setUserName(response.data.name);
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };
        fetchUser();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`/api/admin/users/${id}`, { name: userName });
            dispatch(updateUser(response.data));
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label>User Name</Form.Label>
                <Form.Control
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    required
                />
            </Form.Group>
            <Button type="submit">Update User</Button>
        </Form>
    );
};

export default UserEdit;
