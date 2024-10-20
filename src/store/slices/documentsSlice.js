import { fetchDocsIDs } from "../../services/fetchDocsIDs";
import { fetchDocsDetails } from "../../services/fetchDocsDetails";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchDocumentsIDs = createAsyncThunk(
    'documents/fetchIDs',
    async (params, { rejectWithValue }) => {
        try {
            const response = await fetchDocsIDs(params);

            return response;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const fetchDocumentsDetails = createAsyncThunk(
    'documents/fetchDetails',
    async ({ documentIds }, { rejectWithValue }) => {
        try {
            const response = await fetchDocsDetails({ documentIds });
            return response;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);
const documentsSlice = createSlice({
    name: 'documents',
    initialState: {
        ids: [],
        details: {},
        status: 'idle',
        error: null
    },
    reducers: {
        setDocumentsIDs: (state, action) => {
            state.ids = action.payload;
            localStorage.setItem('docsIDs', JSON.stringify(action.payload))
        },
        setDocumentsDetails: (state, action) => {
            state.details = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchDocumentsIDs.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchDocumentsIDs.fulfilled, (state, action) => {
                state.status = 'completed';
                state.ids = action.payload;
                localStorage.setItem('docsIDs', JSON.stringify(action.payload))

            })
            .addCase(fetchDocumentsIDs.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.payload;
            })
            .addCase(fetchDocumentsDetails.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchDocumentsDetails.fulfilled, (state, action) => {
                state.status = 'completed';
                state.details = action.payload;
                localStorage.setItem('documentsDetails', JSON.stringify(action.payload));
            })
            .addCase(fetchDocumentsDetails.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.error.message;
            })
    }
});

export const { setDocumentsIDs, setDocumentsDetails } = documentsSlice.actions;
export default documentsSlice.reducer;
