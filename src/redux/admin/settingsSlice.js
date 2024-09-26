import { createSlice } from '@reduxjs/toolkit';

const settingsSlice = createSlice({
    name: 'settings',
    initialState: {
        data: {}, // All settings stored here
    },
    reducers: {
        setSetting: (state, action) => {
            const { key, value } = action.payload;
            state.data[key] = value; // Update the setting by key
        },
        setAllSettings: (state, action) => {
            state.data = action.payload; // Load all settings at once
        },
    },
});

export const { setSetting, setAllSettings } = settingsSlice.actions;
export default settingsSlice.reducer;
