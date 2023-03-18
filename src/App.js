import React from 'react';

import Header from "./components/Header";
import TasksContainer from "./components/TasksContainer";
import Footer from "./components/Footer";

function App() {
    return (
        <section className='todo-list-container'>
            <Header/>
            <TasksContainer/>
            <Footer/>
        </section>
    );
}

export default App;