import { configureStore } from "@reduxjs/toolkit";
import authReducer from './slices/authSlice'
import companyLimitsSlice from "./slices/userLimitsSlice";
import histogramsSlice from "./slices/histogramsSlice";
import documentsSlice from "./slices/documentsSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        companyLimits: companyLimitsSlice,
        histograms: histogramsSlice,
        documents: documentsSlice,
    }
})

export default store