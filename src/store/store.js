import { configureStore } from "@reduxjs/toolkit";
import authReducer from './slices/authSlice'
import companyLimitsSlice from "./slices/userLimitsSlice";
import histogramsSlice from "./slices/histogramsSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        companyLimits: companyLimitsSlice,
        histograms: histogramsSlice
    }
})

export default store