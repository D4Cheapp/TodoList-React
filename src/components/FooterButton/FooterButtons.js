import React from 'react';
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import style from './FooterButton.module.scss';
import clsx from "clsx";
import {clearCompletedAction, toggleStateAction} from "../../redux/reducer/localStorageReducer";

//Компонент кнопок под формой
function FooterButtons() {
    const todoList = useSelector(state => state);
    const dispatch = useDispatch();

    //Подсчет количества активных задач
    const taskCounter = todoList.reduce((counter, task) => {
        return (!task.checked) ? counter + 1 : counter
    }, 0);

    //Функция очистки выполненных задач
    function clearCompleted() {
        dispatch(clearCompletedAction());
    }

    //Функция переключения состояний задач
    function toggleState() {
        dispatch(toggleStateAction());
    }

    return (
        <footer className={style.footer}>

            {/*Переключение фильтрации задач*/}
            <div className={style.firstRow}>
                <NavLink to='/' className={({isActive}) => clsx(style.firstRowButton, {[style.active] : isActive})}>
                    All
                </NavLink>

                <NavLink to='/active' className={({isActive}) => clsx(style.firstRowButton, {[style.active] : isActive})}>
                    Active
                </NavLink>

                <NavLink to='/completed' className={({isActive}) => clsx(style.firstRowButton, {[style.active] : isActive})}>
                    Completed
                </NavLink>
            </div>

            <div className={style.secondRow}>
                {/*Счетчик выполненных задач*/}
                <p className={style.leftTasks}>
                    {'task left ' + taskCounter}
                </p>

                {/*Кнопка очистки выполненных задач*/}
                <button className={style.secondRowButton} onClick={clearCompleted}>
                        Clear completed
                </button>

                {/*Кнопка переключения состояния задач*/}
                <button className={style.secondRowButton} onClick={toggleState}>
                    Toggle all state
                </button>
            </div>
        </footer>
    );
}

export default FooterButtons;