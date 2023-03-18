import React from 'react';

function Header() {
    return (
        <header>
            <h1 className='header__title'>
                Todo List
            </h1>
            <input type="text" className="header__task-input" placeholder="Whats need to be done?"/>
        </header>
    );
}

export default Header;