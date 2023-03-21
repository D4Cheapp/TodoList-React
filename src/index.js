import {createHashRouter, redirect, RouterProvider} from "react-router-dom";
import ReactDOM from 'react-dom/client';
import React from 'react';
import App from "./App";

import 'normalize.css/normalize.css';
import './style.sass'
import {Provider} from "react-redux";
import store from "./redux/store/store";

const router = createHashRouter([
    {
        path:'/',
        element: <App/>,
    },
    {
        path: '/active',
        element: <App/>
    },
    {
        path: '/completed',
        element: <App/>
    },
    {
        path: '/*',
        loader: () => {return redirect('/')},
    }
])

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <Provider store={store}>
        <RouterProvider router={router}/>
    </Provider>
);

