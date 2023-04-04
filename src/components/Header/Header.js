import React from 'react';
import {useDispatch} from "react-redux";
import './Header.sass'

function Header() {
    const dispatch = useDispatch()

    function inputReader(event) {
        if (event.key === 'Enter' && !!event.currentTarget.value.trim()){
            const title = event.currentTarget.value.replace(/\s+/gm,' ').trim()

            dispatch({type: 'ADD', task: {
                    title: title,
                    checked: false,
                    id: Date.now()
            }})

            event.currentTarget.value = ''
        }

        if (!event.currentTarget.value.trim()){
            event.currentTarget.value = ''
        }
    }

    return (
        <header>
            <h1 className='header__title'>
                Todo List
            </h1>
            <input type="text" className="header__task-input" onKeyDown={inputReader}
                   placeholder="Whats need to be done?"/>
        </header>
    );
}

export default Header;