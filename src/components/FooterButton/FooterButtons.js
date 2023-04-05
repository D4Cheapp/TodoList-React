import React from 'react';
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import style from './FooterButton.module.scss';

function FooterButtons() {
    const todoList = useSelector(state => state);

    const dispatch = useDispatch();

    const taskCounter = todoList.reduce((counter, task) => {
        return (!task.checked) ? counter + 1 : counter
    }, 0);

    function clearCompleted() {
        dispatch({type: 'CLEAR_COMPLETED'});
    }

    function toggleState() {
        dispatch({type: 'TOGGLE_ALL_STATE'});
    }

    return (
        <footer className={style.footer}>
            <div className={style.firstRow}>
                <NavLink to='/' className={style.firstRowButton}>
                    All
                </NavLink>

                <NavLink to='/active' className={style.firstRowButton}>
                    Active
                </NavLink>

                <NavLink to='/completed' className={style.firstRowButton}>
                    Completed
                </NavLink>
            </div>

            <div className={style.secondRow}>
                <p className={style.leftTasks}>
                    {'task left ' + taskCounter}
                </p>

                <button className={style.secondRowButton} onClick={clearCompleted}>
                        Clear completed
                </button>

                <button className={style.secondRowButton} onClick={toggleState}>
                    Toggle all state
                </button>
            </div>
        </footer>
    );
}

export default FooterButtons;