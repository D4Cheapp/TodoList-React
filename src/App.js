import React from 'react';

import Header from "./components/Header";
import TasksContainer from "./components/TasksContainer";
import FooterButtons from "./components/FooterButtons";

function App() {
    return (
        <section className='todo-list-container'>
            <Header/>
            <TasksContainer/>
            <FooterButtons/>
        </section>
    );
}

export default App;