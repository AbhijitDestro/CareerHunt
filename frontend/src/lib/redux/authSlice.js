import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        loading: false,
        isAuthenticated: false,
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload.user;
            state.isAuthenticated = !!action.payload.user;
        },
        setLoading: (state, action) => {
            state.loading = action.payload.loading;
        },
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
        },
    },
});

export const { setUser, setLoading, logout } = authSlice.actions;
export default authSlice.reducer;
