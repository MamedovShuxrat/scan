import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getUserInfo } from '../../services/userService'

export const fetchUserInfo = createAsyncThunk(
    'companyLimits/fetchUserInfo',
    async (_, { rejectWithValue }) => {
        try {
            const response = await getUserInfo()
            return response
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)


const companyLimitsSlice = createSlice({
    name: 'companyLimits',
    initialState: {
        usedCompanyCount: 0,
        companyLimit: 0,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserInfo.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchUserInfo.fulfilled, (state, action) => {
                state.loading = false
                state.companyLimit = action.payload.eventFiltersInfo.companyLimit;
                state.usedCompanyCount = action.payload.eventFiltersInfo.usedCompanyCount;
            })
            .addCase(fetchUserInfo.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
    }
})

export default companyLimitsSlice.reducer
