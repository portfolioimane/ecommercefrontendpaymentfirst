import { createSlice } from '@reduxjs/toolkit';

const reviewSlice = createSlice({
    name: 'reviews',
    initialState: { items: [] },
    reducers: {
        setReviews: (state, action) => {
            state.items = action.payload;
        },
        addReview: (state, action) => {
            state.items.push(action.payload);
        },
        deleteReview: (state, action) => {
            state.items = state.items.filter(review => review.id !== action.payload);
        },
    },
});

export const { setReviews, addReview, deleteReview } = reviewSlice.actions;
export default reviewSlice.reducer;
