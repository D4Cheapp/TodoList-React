import React from 'react';
import {useDispatch} from "react-redux";
import style from './Header.module.scss';
import {addTask} from "../../redux/actions";

function Header() {
    const dispatch = useDispatch();

    //Считывание пользовательского ввода
    function inputReader(event) {
        //Считывание ввода при нажатии enter и не пустом поле ввода
        if (event.key === 'Enter' && !!event.currentTarget.value.trim()){

            //Удаление больших пустых промежутков в словах
            const title = event.currentTarget.value.replace(/\s+/gm,' ').trim();

            const task = {
                title: title,
                checked: false,
                id: Date.now()
            };

            dispatch(addTask(task));

            event.currentTarget.value = '';
        }

        //Проверка на пустоту ли ввода
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