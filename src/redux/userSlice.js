import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        profile: null,
    },
    reducers: {
        setUserProfile: (state, action) => {
            state.profile = action.payload;
        },
        clearUserProfile: (state) => {
            state.profile = null;
        },
    },
});

export const { setUserProfile, clearUserProfile } = userSlice.actions;
export default userSlice.reducer;
