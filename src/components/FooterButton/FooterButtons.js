import React from 'react';
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import './FooterButton.scss'

function FooterButtons() {
    const todoList = useSelector(state => state)

    const dispatch = useDispatch()

    const taskCounter = todoList.reduce((counter, task) => {
        return (!task.checked) ? counter + 1 : counter
    }, 0)

    function clearCompleted() {
        dispatch({type: 'CLEAR_COMPLETED'})
    }

    function toggleState() {
        dispatch({type: 'TOGGLE_ALL_STATE'})
    }

    return (
        <footer>
            <div className="first-buttons-row">
                <NavLink to='/' className="first-buttons-row__button">
                    All
                </NavLink>

                <NavLink to='/active' className="first-buttons-row__button">
                    Active
                </NavLink>

                <NavLink to='/completed' className="first-buttons-row__button">
                    Completed
                </NavLink>
            </div>

            <div className="second-buttons-row">
                <p className="second-buttons-row__left-tasks">
                    {'task left ' + taskCounter}
                </p>

                <button className="second-buttons-row__button" onClick={clearCompleted}>
                        Clear completed
                </button>

                <button className="second-buttons-row__button" onClick={toggleState}>
                    Toggle all state
                </button>
            </div>
        </footer>
    );
}

export default FooterButtons;