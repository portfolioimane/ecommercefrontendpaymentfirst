import { createSlice } from '@reduxjs/toolkit';

const orderSlice = createSlice({
    name: 'orders',
    initialState: { 
     items: [],
  itemsfrontend: [],     
   },
    reducers: {
        setOrders: (state, action) => {
            state.items = action.payload;
        },
        addOrder: (state, action) => {
            state.items.push(action.payload);
        },
        addOrderFrontend: (state, action) => {
      // Ensure the order is added to the frontend orders
      state.itemsfrontend.push(action.payload);
    },   
        deleteOrder: (state, action) => {
            state.items = state.items.filter(order => order.id !== action.payload);
        },
    },
});

export const { setOrders, addOrder, addOrderFrontend, deleteOrder } = orderSlice.actions;
export default orderSlice.reducer;
