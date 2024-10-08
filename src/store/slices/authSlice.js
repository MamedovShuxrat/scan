import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginUser } from "../../services/authService";
import { fetchUserInfo } from "./userSlice";

export const login = createAsyncThunk(
    'auth/login',
    async ({ login, password }, { dispatch, rejectWithValue }) => {
        try {
            const data = await loginUser(login, password)
            localStorage.setItem('token', data.accessToken)
            await dispatch(fetchUserInfo())
            return data
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

const initialState = {
    user: null,
    token: null,
    isAuthenticated: false,
    loading: false,
    error: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout(state) {
            state.user = null
            state.token = null
            state.isAuthenticated = false
            localStorage.removeItem('token')
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(login.fulfilled, (state, action) => {
                state.token = action.payload.accessToken
                state.isAuthenticated = true
                state.loading = false
                state.error = null
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
    }
})

export const { logout } = authSlice.actions

export default authSlice.reducer