import React from 'react';

function Footer() {
    return (
        <footer>
            <div className="first-buttons-row">
                <button className="first-buttons-row__button">
                    All
                </button>

                <button className="first-buttons-row__button">
                    Active
                </button>

                <button className="first-buttons-row__button">
                    Completed
                </button>
            </div>

            <div className="second-buttons-row">
                <p className="second-buttons-row__left-tasks">
                    {'task left'}
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

export default Footer;