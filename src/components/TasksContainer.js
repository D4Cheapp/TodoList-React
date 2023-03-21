import {useDispatch, useSelector} from 'react-redux';
import React, {useRef} from 'react';

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

    const titleRef = useRef()

    function deleteTask() {
        dispatch({type: 'DELETE', id: id})
    }

    function checkTask() {
        dispatch({type: 'CHECK', id: id})
    }

    function taskEditing() {
        titleRef.current?.focus()
        titleRef.current?.removeAttribute('readonly')
    }

    function focusOut() {
        dispatch({type:'EDIT', id:id, title:titleRef.current?.value})
        titleRef.current?.setAttribute('readonly', 'true')
    }

    return (
        <div className='task' id={id} onDoubleClick={taskEditing} onBlur={focusOut}>
            <label className='checkbox'>
                <input className='checkbox__input' type='checkbox' checked={checked} onChange={checkTask}/>

                <div className='checkbox__custom'/>
            </label>

            <textarea className='task__title' ref={titleRef} defaultValue={title} readOnly/>

            <button className='task__remove-button' onClick={deleteTask}/>
        </div>
    )
}

export default TasksContainer;