import localStorageReducer from "../reducer/LocalStorageReducer";
import {configureStore} from "@reduxjs/toolkit";

const store = configureStore({reducer: localStorageReducer});

export default store;