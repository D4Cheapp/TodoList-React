import React from 'react';
import {useSelector} from 'react-redux';

function TasksContainer() {
    const tasksArray = useSelector(state => state)

    return (
        <div className='tasks-container'>
            {tasksArray.map(task => <TaskCreating key={task.id}
                 title={task.title} checked={task.checked} id={task.id}/>)}
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

            <p className='task__title'>
                {title}
            </p>

            <button className='task__remove-button'/>
        </div>
    )
}

export default TasksContainer;