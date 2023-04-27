import {createHashRouter, redirect, RouterProvider} from "react-router-dom";
import ReactDOM from 'react-dom/client';
import React from 'react';
import App from "./App";
import {Provider} from "react-redux";
import {store} from "./redux/store";

//Роутинг
const router = createHashRouter([
    {
        path:'/',
        element: <App/>,
        children: [
            {
                path: '/active',
                element: null
            },
            {
                path: '/completed',
                element: null
            },
            {
                path: '/*',
                loader: () => {return redirect('/')},
            }
        ]
    }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));

//Подключение redux store и react router
root.render(
    <Provider store={store}>
        <RouterProvider router={router}/>
    </Provider>
);

