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
    const checkboxRef = useRef()
    const deleteButtonRef = useRef()

    function deleteTask() {
        dispatch({type: 'DELETE', id: id})
    }

    function checkTask() {
        dispatch({type: 'CHECK', id: id})
    }

    function taskEditing() {
        checkboxRef.current.style.display = 'none'
        deleteButtonRef.current.style.display = 'none'

        titleRef.current?.focus()
        titleRef.current?.removeAttribute('readonly')
    }

    function focusOut() {
        const taskValue = titleRef.current?.value.replace(/\s+/gm,' ').trim()

        if (taskValue) {
            checkboxRef.current.style.display = ''
            deleteButtonRef.current.style.display = ''

            titleRef.current.value = taskValue

            dispatch({type: 'EDIT', id: id, title: taskValue})
            titleRef.current?.setAttribute('readonly', 'true')
        }
        else {
            deleteTask()
        }
    }

    return (
        <div className='task' id={id} onDoubleClick={taskEditing} onBlur={focusOut}>
            <label className='checkbox' ref={checkboxRef}>
                <input className='checkbox__input' type='checkbox' checked={checked} onChange={checkTask}/>

                <div className='checkbox__custom'/>
            </label>

            <textarea className='task__title' ref={titleRef} defaultValue={title} readOnly/>

            <button className='task__remove-button' onClick={deleteTask} ref={deleteButtonRef}/>
        </div>
    )
}

export default TasksContainer;