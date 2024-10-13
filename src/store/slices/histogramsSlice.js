import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { fetchHistograms } from "../../services/fetchHistogramsService";

export const getHistograms = createAsyncThunk(
    'histograms/getHistograms',
    async (params, { rejectWithValue }) => {
        try {
            const data = await fetchHistograms(params)
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
        status: 'idle',
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getHistograms.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(getHistograms.fulfilled, (state, action) => {
                state.status = 'completed';
                state.data = action.payload
            })
            .addCase(getHistograms.rejected, (state, action) => {
                state.status = 'rejrected';
                state.error = action.payload;
            })
    }
})

export default histogramsSlice.reducer