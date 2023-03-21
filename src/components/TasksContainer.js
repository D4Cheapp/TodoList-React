import {useDispatch, useSelector} from 'react-redux';
import React from 'react';

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
    const dispatch = useDispatch()

    function deleteTask() {
        dispatch({type: 'DELETE', id: id})
    }

    function checkTask() {
        dispatch({type: 'CHECK', id: id})
    }

    return (
        <div className='task' id={id}>
            <label className='checkbox'>
                <input className='checkbox__input' type='checkbox' checked={checked} onChange={checkTask}/>

                <div className='checkbox__custom'/>
            </label>

            <p className='task__title'>
                {title}
            </p>

            <button className='task__remove-button' onClick={deleteTask}/>
        </div>
    )
}

export default TasksContainer;