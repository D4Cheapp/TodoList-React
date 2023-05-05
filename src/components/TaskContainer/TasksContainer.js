import {useSelector} from 'react-redux';
import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {TaskTemplate} from "./TaskTemplate";
import style from './TasksContainer.module.scss';

//Контейнер задач
function TasksContainer() {
    const tasksArray = useSelector(state => state);
    const navigate = useNavigate();

    const [filter, setFilter] = useState(window.location.href.split('/').at(-1));
    const [innerWidth, setInnerWidth] = useState(window?.innerWidth || 0);

    //Обновление фильтра при загрузке страницы
    useEffect(() => {
        const hrefFilter = window.location.href.split('/').at(-1);
        setFilter(hrefFilter);
    },[navigate]);

    useEffect(() => {
        const widthChange = () => {
            setInnerWidth(window.innerWidth);
        };

        window.addEventListener('resize', widthChange);
        return () => window.removeEventListener('resize', widthChange);
    });

    return (
        <div className={style.container}>
            {tasksArray.map(task => {
                //Фильтрация задач
                if ((filter === 'active' && !task.checked) ||
                        (filter === 'completed' && task.checked) || !filter) {
                  return  <TaskTemplate key={task.id} title={task.title} innerWidth={innerWidth}
                                            checked={task.checked} id={task.id}/> ;
                }
            })}
        </div>
    );
}

export default TasksContainer;