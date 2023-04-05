import {useDispatch} from "react-redux";
import React, {useEffect, useRef} from "react";
import Cross from '../../../images/cross-mark.svg';
import clsx from "clsx";
import style from './TaskTemplate.module.scss';

function TaskTemplate({title, checked, id}) {
    const dispatch = useDispatch();

    const taskRef = useRef();
    const titleRef = useRef();
    const checkboxRef = useRef();
    const deleteButtonRef = useRef();
    const inputRef = useRef();

    function deleteTask() {
        dispatch({type: 'DELETE', id: id});
    }

    function checkTask() {
        dispatch({type: 'CHECK', id: id});
    }

    function taskEditing() {
        window.getSelection().removeAllRanges();
        titleRef.current.selectionStart = titleRef.current?.value.length;

        taskRef.current?.classList.add(style.editing);
        checkboxRef.current.style.visibility = 'hidden';
        deleteButtonRef.current.style.visibility = 'hidden';

        titleRef.current?.focus();
        titleRef.current?.removeAttribute('readonly');
    }

    function resizeTaskTitle() {
        titleRef.current.style.height = '10px';
        titleRef.current.style.height = titleRef.current?.scrollHeight+'px';
    }

    window.addEventListener('resize', resizeTaskTitle);

    function editFocusOut() {
        const taskValue = titleRef.current?.value.replace(/\s+/gm,' ').trim();

        if (taskValue) {
            taskRef.current?.classList.remove(style.editing);
            checkboxRef.current?.removeAttribute('style');
            deleteButtonRef.current.style.visibility = 'unset';

            titleRef.current.value = taskValue;

            dispatch({type: 'EDIT', id: id, title: taskValue});
            titleRef.current?.setAttribute('readonly', 'true');

            resizeTaskTitle();
        }
        else {
            deleteTask();
        }
    }

    function editEnterCheck(event) {
        if (document.activeElement === titleRef.current){
            if (event.key === 'Enter'){
                editFocusOut();
            }
        }
    }

    useEffect(() => {
        resizeTaskTitle();
    }, []);

    return (
        <div className={clsx(style.task, {'completed': checked})}
             id={id} onDoubleClick={taskEditing} onBlur={editFocusOut} ref={taskRef}>

            <label className={style.checkbox} ref={checkboxRef}>
                <input className={style.checkboxInput} type='checkbox' ref={inputRef}
                       checked={checked} onChange={checkTask}/>

                <div className={style.customCheckbox}/>
            </label>

            <textarea className={style.title} ref={titleRef}
                      onKeyDown={(event) => {
                          editEnterCheck(event);
                          resizeTaskTitle();
                      }} defaultValue={title} readOnly/>

            <button className={style.removeButton} style={{backgroundImage: `url(${Cross})`}}
                    onClick={deleteTask} ref={deleteButtonRef}/>
        </div>
    )
}

export default TaskTemplate