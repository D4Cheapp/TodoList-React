import React from 'react';
import {useDispatch} from "react-redux";
import style from './Header.module.scss';
import {addTask} from "../../redux/actions";

function Header() {
    const dispatch = useDispatch();

    function inputReader(event) {
        if (event.key === 'Enter' && !!event.currentTarget.value.trim()){
            const title = event.currentTarget.value.replace(/\s+/gm,' ').trim();

            const task = {
                title: title,
                checked: false,
                id: Date.now()
            };

            dispatch(addTask(task));

            event.currentTarget.value = '';
        }

        if (!event.currentTarget.value.trim()){
            event.currentTarget.value = '';
        }
    }

    return (
        <header className={style.header}>
            <h1 className={style.title}>
                Todo List
            </h1>
            <input type="text" className={style.taskInput} onKeyDown={inputReader}
                   placeholder="Whats need to be done?"/>
        </header>
    );
}

export default Header;