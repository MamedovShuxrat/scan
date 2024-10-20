import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginUser } from "../../services/authService";
import { fetchUserInfo } from "./userLimitsSlice";

export const login = createAsyncThunk(
    'auth/login',
    async ({ login, password }, { dispatch, rejectWithValue }) => {
        try {
            const data = await loginUser(login, password)
            const { accessToken, expire } = data

            localStorage.setItem('token', accessToken)
            localStorage.setItem('expire', expire)

            dispatch(setToken(accessToken))
            dispatch(setTokenExpire(expire))

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
    expire: null,
    isAuthenticated: false,
    loading: false,
    error: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setToken(state, action) {
            state.token = action.payload
            state.isAuthenticated = true
        },
        setTokenExpire(state, action) {
            state.expire = action.payload
        },
        logout(state) {
            state.user = null
            state.token = null
            state.expire = null
            state.isAuthenticated = false
            localStorage.removeItem('token')
            localStorage.removeItem('expire')
            localStorage.removeItem('histogramsData')
            localStorage.removeItem('documentsDetails')
            localStorage.removeItem('docsIDs')
            localStorage.removeItem('docsData')
            localStorage.removeItem('searchPerformed')

        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true
                state.isAuthenticated = true
                state.error = null
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false
                state.error = null
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
    }
})

export const { setToken, setTokenExpire, logout } = authSlice.actions

export default authSlice.reducer