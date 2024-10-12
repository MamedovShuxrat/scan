import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { fetchHistograms } from "../../services/fetchHistogramsService";
const token = localStorage.getItem('token')

export const getHistograms = createAsyncThunk(
    'histograms/getHistograms',
    async (params, { rejectWithValue }) => {
        try {
            const data = await fetchHistograms(params, token)
            return data
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

const histogramsSlice = createSlice({
    name: 'histograms',
    initialState: {
        data: null,
        loading: null,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getHistograms.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(getHistograms.fulfilled, (state, action) => {
                state.loading = false
                state.data = action.payload
            })
            .addCase(getHistograms.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
    }
})

export default histogramsSlice.reducer