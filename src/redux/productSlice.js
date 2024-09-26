import { createSlice } from '@reduxjs/toolkit';

const productSlice = createSlice({
    name: 'products',
    initialState: {
        items: [],
        currentProduct: null, // Add a field for the current product
    },
    reducers: {
        setProducts: (state, action) => {
            state.items = action.payload;
        },
        fetchProductById: (state, action) => {
            const productId = action.payload;
            // Find the product by ID and set it as the current product
            state.currentProduct = state.items.find(item => item.id === productId) || null;
        },
        clearCurrentProduct: (state) => {
            state.currentProduct = null; // Clear the current product
        },
    },
});

export const { setProducts, fetchProductById, clearCurrentProduct } = productSlice.actions;
export default productSlice.reducer;
