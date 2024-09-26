import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'users',
    initialState: { items: [] },
    reducers: {
        setUsers: (state, action) => {
            state.items = action.payload;
        },
        addUser: (state, action) => {
            state.items.push(action.payload);
        },
        updateUser: (state, action) => {
            const index = state.items.findIndex(user => user.id === action.payload.id);
            if (index !== -1) {
                state.items[index] = action.payload;
            }
        },
        deleteUser: (state, action) => {
            state.items = state.items.filter(user => user.id !== action.payload);
        },
    },
});

export const { setUsers, addUser, updateUser, deleteUser } = userSlice.actions;
export default userSlice.reducer;
