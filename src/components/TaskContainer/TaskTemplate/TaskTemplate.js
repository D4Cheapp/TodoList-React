import {useDispatch} from "react-redux";
import React, {useEffect, useRef, useState} from "react";
import Cross from '../../../images/cross-mark.svg';
import '../TasksContainer.sass'
import './TaskTemplate.sass'

function TaskTemplate({title, checked, id}) {
    const dispatch = useDispatch()

    const [isChecked, setIsChecked] = useState(false)

    const taskRef = useRef()
    const titleRef = useRef()
    const checkboxRef = useRef()
    const deleteButtonRef = useRef()
    const inputRef = useRef()

    function deleteTask() {
        dispatch({type: 'DELETE', id: id})
    }

    function checkTask() {
        setIsChecked(inputRef.current?.checked)
        dispatch({type: 'CHECK', id: id})
    }

    function taskEditing() {
        window.getSelection().removeAllRanges()
        titleRef.current.selectionStart = titleRef.current?.value.length

        taskRef.current?.classList.add('editing')
        checkboxRef.current.style.visibility = 'hidden'
        deleteButtonRef.current.style.visibility = 'hidden'

        titleRef.current?.focus()
        titleRef.current?.removeAttribute('readonly')
    }

    function resizeTaskTitle() {
        titleRef.current.style.height = '10px'
        titleRef.current.style.height = titleRef.current?.scrollHeight+'px'
    }

    window.addEventListener('resize', resizeTaskTitle)

    function editFocusOut() {
        const taskValue = titleRef.current?.value.replace(/\s+/gm,' ').trim()

        if (taskValue) {
            taskRef.current?.classList.remove('editing')
            checkboxRef.current?.removeAttribute('style')
            deleteButtonRef.current.style.visibility = 'unset'

            titleRef.current.value = taskValue

            dispatch({type: 'EDIT', id: id, title: taskValue})
            titleRef.current?.setAttribute('readonly', 'true')

            resizeTaskTitle()
        }
        else {
            deleteTask()
        }
    }

    function editEnterCheck(event) {
        if (document.activeElement === titleRef.current){
            if (event.key === 'Enter'){
                editFocusOut()
            }
        }
    }

    useEffect(() => {
        resizeTaskTitle()
        setIsChecked(inputRef.current?.checked)
    }, []);

    return (
        <div className={`task ${isChecked ? 'completed' : ''}`} id={id} onDoubleClick={taskEditing} onBlur={editFocusOut} ref={taskRef}>
            <label className='checkbox' ref={checkboxRef}>
                <input className='checkbox__input' type='checkbox' ref={inputRef}
                       checked={checked} onChange={checkTask}/>

                <div className='checkbox__custom'/>
            </label>

            <textarea className='task__title' ref={titleRef}
                      onKeyDown={(event) => {editEnterCheck(event); resizeTaskTitle()}} defaultValue={title} readOnly/>

            <button className='task__remove-button' style={{backgroundImage: `url(${Cross})`}} onClick={deleteTask} ref={deleteButtonRef}/>
        </div>
    )
}

export default TaskTemplate