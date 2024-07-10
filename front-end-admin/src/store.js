import { configureStore } from "@reduxjs/toolkit";
import barbershopSlice from "./features/barbershopSlice";
import historySlice from "./features/historySlice";

export const store = configureStore({
    reducer: {
        barbershops: barbershopSlice,
        histories: historySlice
    }
})