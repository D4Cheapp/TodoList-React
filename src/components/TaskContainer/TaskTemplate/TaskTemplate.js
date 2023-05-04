import {useDispatch} from "react-redux";
import clsx from "clsx";
import React, {useEffect, useRef, useState} from "react";
import Cross from '../../../images/cross-mark.svg';
import style from './TaskTemplate.module.scss';
import {checkTaskAction, deleteTaskAction, taskEditAction} from "../../../redux/reducer/localStorageReducer";

//Шаблон для задачи
function TaskTemplate({title, checked, id}) {
    const dispatch = useDispatch();

    const [isEditing, setEditing] = useState(false);

    const titleRef = useRef();

    //Удаление задачи
    function deleteTask() {
        dispatch(deleteTaskAction(id));
    }

    //Отметка выполнения задачи
    function checkTask() {
        dispatch(checkTaskAction(id));
    }

    //Изменение задачи
    function taskEditing() {
        window.getSelection().removeAllRanges();
        titleRef.current.selectionStart = titleRef.current?.value.length;

        setEditing(true);

        titleRef.current?.focus();
    }

    //Подгонка размера контейнера под контент
    function resizeTaskTitle() {
        titleRef.current.style.height = '10px';
        titleRef.current.style.height = titleRef.current?.scrollHeight+'px';
    }

    //Завершение редактирования задачи
    function editFocusOut() {
        const taskValue = titleRef.current?.value.replace(/\s+/gm,' ').trim();

        if (taskValue) {
            setEditing(false);

            titleRef.current.value = taskValue;

            dispatch(taskEditAction({id, taskValue}));

            resizeTaskTitle();
        }
        else {
            deleteTask();
        }
    }

    //Проверка на нажатие enter во время редактирования задачи
    function editEnterCheck(event) {
        if (document.activeElement === titleRef.current){
            if (event.key === 'Enter'){
                editFocusOut();
            }
        }
    }

    //Подгонка размеров задач при загрузке страницы
    useEffect(() => {
        resizeTaskTitle();

        window.addEventListener('resize', resizeTaskTitle);
        return () => window.removeEventListener('resize', resizeTaskTitle);
    }, []);

    return (
        <div className={clsx(style.task, {[style.completed]: checked, [style.editing]: isEditing})}
             id={id} onDoubleClick={taskEditing} onBlur={editFocusOut}>

            {/*Чекбокс выполнения задачи*/}
            <label className={clsx(style.checkbox, {[style.hidden] : isEditing})}>
                <input className={style.checkboxInput} type='checkbox'
                       checked={checked} onChange={checkTask}/>

                <div className={style.customCheckbox}/>
            </label>

            {/*Текст задачи*/}
            <textarea className={style.title} ref={titleRef}
                      onKeyDown={(event) => {
                          editEnterCheck(event);
                          resizeTaskTitle();
                      }} defaultValue={title} readOnly={!isEditing}/>

            {/*Кнопка удаления задачи*/}
            <button className={clsx(style.removeButton,{[style.hidden]: isEditing})}
                    style={{backgroundImage: `url(${Cross})`}} onClick={deleteTask}/>
        </div>
    )
}

export default TaskTemplate