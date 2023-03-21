import {createStore} from "redux";
import localStorageReducer from "../reducer/LocalStorageReducer";

const store = createStore(localStorageReducer)

export default store