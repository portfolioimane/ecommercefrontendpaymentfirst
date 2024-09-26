import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { addUser } from '../../../redux/admin/userSlice';
import { Button, Form } from 'react-bootstrap';

const UserCreate = () => {
    const dispatch = useDispatch();
    const [userName, setUserName] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/admin/users', { name: userName });
            dispatch(addUser(response.data));
            setUserName('');
        } catch (error) {
            console.error('Error creating user:', error);
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
            <Button type="submit">Create User</Button>
        </Form>
    );
};

export default UserCreate;
