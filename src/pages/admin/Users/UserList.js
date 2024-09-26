import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setUsers, deleteUser } from '../../../redux/admin/userSlice';
import { Button } from 'react-bootstrap';

const UserList = () => {
    const dispatch = useDispatch();
    const users = useSelector(state => state.users.items);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('/api/admin/users');
                dispatch(setUsers(response.data));
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };
        fetchUsers();
    }, [dispatch]);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/api/admin/users/${id}`);
            dispatch(deleteUser(id));
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    return (
        <div>
            <h1>User List</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>
                                <Button onClick={() => handleDelete(user.id)}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserList;
