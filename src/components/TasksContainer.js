import React from 'react';

function TasksContainer() {
    const startArray = []

    return (
        <div className='tasks-container'>
            {startArray.map(task =>
                <TaskCreating title={task.title} checked={task.checked} id={task.id}/>)}
        </div>
    );
}

function TaskCreating({title, checked, id}) {
    return (
        <div className='task' id={id}>
            <label className='checkbox'>
                <input className='checkbox__input' type='checkbox' checked={checked}/>

                <div className='checkbox__custom'/>
            </label>

            <p className="task__title">
                {title}
            </p>

            <button className="task__remove-button"/>
        </div>
    )
}

export default TasksContainer;