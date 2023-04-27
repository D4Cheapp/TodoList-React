import React from 'react';

import {Header} from "./components/Header";
import {TasksContainer} from "./components/TaskContainer";
import {FooterButtons} from "./components/FooterButton";

//Контейнер для всего компонента списка дел
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