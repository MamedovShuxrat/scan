import { configureStore } from "@reduxjs/toolkit";
import authReducer from './slices/authSlice'
import companyLimitsSlice from "./slices/userLimitsSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        companyLimits: companyLimitsSlice
    }
})

export default store