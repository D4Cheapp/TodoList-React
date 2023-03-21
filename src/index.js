import {createHashRouter, redirect, RouterProvider} from "react-router-dom";
import ReactDOM from 'react-dom/client';
import React from 'react';
import App from "./App";

import 'normalize.css/normalize.css';
import './style.sass'

const router = createHashRouter([
    {
        path:'/',
        element: <App/>,
    },
    {
        path: '/active',
        loader: () => {console.log('active'); return null},
        element: <App/>
    },
    {
        path: '/completed',
        loader: () => {console.log('completed'); return null},
        element: <App/>
    },
    {
        path: '/*',
        loader: () => {return redirect('/')},
    }
])

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
        <RouterProvider router={router}/>
);

