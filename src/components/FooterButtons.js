import React from 'react';
import {NavLink} from "react-router-dom";
import {useSelector} from "react-redux";

function FooterButtons() {
    const todoList = useSelector(state => state)

    const taskCounter = todoList.reduce((counter, task) => {
        return (!task.checked) ? counter + 1 : counter
    }, 0)

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

                <button className="second-buttons-row__button">
                        Clear completed
                </button>

                <button className="second-buttons-row__button">
                    Toggle all state
                </button>
            </div>
        </footer>
    );
}

export default FooterButtons;