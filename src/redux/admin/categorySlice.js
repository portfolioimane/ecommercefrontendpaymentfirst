import { createSlice } from '@reduxjs/toolkit';

const categorySlice = createSlice({
    name: 'categories',
    initialState: { items: [] },
    reducers: {
        setCategories: (state, action) => {
            state.items = action.payload;
        },
        addCategory: (state, action) => {
            state.items.push(action.payload);
        },
        updateCategory: (state, action) => {
            const index = state.items.findIndex(cat => cat.id === action.payload.id);
            if (index !== -1) {
                state.items[index] = action.payload;
            }
        },
        deleteCategory: (state, action) => {
            state.items = state.items.filter(cat => cat.id !== action.payload);
        },
    },
});

export const { setCategories, addCategory, updateCategory, deleteCategory } = categorySlice.actions;
export default categorySlice.reducer;
