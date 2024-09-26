import { createSlice } from '@reduxjs/toolkit';

const productSlice = createSlice({
    name: 'products',
    initialState: { items: [] },
    reducers: {
        setProducts: (state, action) => {
            state.items = action.payload;
        },
        addProduct: (state, action) => {
            state.items.push(action.payload);
        },
        updateProduct: (state, action) => {
            const index = state.items.findIndex(prod => prod.id === action.payload.id);
            if (index !== -1) {
                state.items[index] = action.payload;
            }
        },
        deleteProduct: (state, action) => {
            state.items = state.items.filter(prod => prod.id !== action.payload);
        },
    },
});

export const { setProducts, addProduct, updateProduct, deleteProduct } = productSlice.actions;
export default productSlice.reducer;
