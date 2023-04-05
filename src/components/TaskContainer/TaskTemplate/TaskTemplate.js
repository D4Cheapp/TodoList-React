import {useDispatch} from "react-redux";
import clsx from "clsx";
import React, {useEffect, useRef, useState} from "react";
import Cross from '../../../images/cross-mark.svg';
import style from './TaskTemplate.module.scss';

function TaskTemplate({title, checked, id}) {
    const dispatch = useDispatch();

    const [isEditing, setEditing] = useState(false);

    const titleRef = useRef();

    function deleteTask() {
        dispatch({type: 'DELETE', id: id});
    }

    function checkTask() {
        dispatch({type: 'CHECK', id: id});
    }

    function taskEditing() {
        window.getSelection().removeAllRanges();
        titleRef.current.selectionStart = titleRef.current?.value.length;

        setEditing(true);

        titleRef.current?.focus();
    }

    function resizeTaskTitle() {
        titleRef.current.style.height = '10px';
        titleRef.current.style.height = titleRef.current?.scrollHeight+'px';
    }

    window.addEventListener('resize', resizeTaskTitle);

    function editFocusOut() {
        const taskValue = titleRef.current?.value.replace(/\s+/gm,' ').trim();

        if (taskValue) {
            setEditing(false);

            titleRef.current.value = taskValue;

            dispatch({type: 'EDIT', id: id, title: taskValue});

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
        <div className={clsx(style.task, {[style.completed]: checked, [style.editing]: isEditing})}
             id={id} onDoubleClick={taskEditing} onBlur={editFocusOut}>

            <label className={clsx(style.checkbox, {[style.hidden] : isEditing})}>
                <input className={style.checkboxInput} type='checkbox'
                       checked={checked} onChange={checkTask}/>

                <div className={style.customCheckbox}/>
            </label>

            <textarea className={style.title} ref={titleRef}
                      onKeyDown={(event) => {
                          editEnterCheck(event);
                          resizeTaskTitle();
                      }} defaultValue={title} readOnly={!isEditing}/>

            <button className={clsx(style.removeButton,{[style.hidden]: isEditing})}
                    style={{backgroundImage: `url(${Cross})`}} onClick={deleteTask}/>
        </div>
    )
}

export default TaskTemplate