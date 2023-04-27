import {configureStore} from "@reduxjs/toolkit";
import {localStorageReducer} from "../reducer";

//Создание основного redux хранилища с редьюсером localStorageReducer
const store = configureStore({reducer: localStorageReducer});

export default store;