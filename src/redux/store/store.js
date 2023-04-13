import {configureStore} from "@reduxjs/toolkit";
import {localStorageReducer} from "../reducer";

const store = configureStore({reducer: localStorageReducer});

export default store;