import {useSelector} from 'react-redux';
import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {TaskTemplate} from "./TaskTemplate";
import style from './TasksContainer.module.scss';

function TasksContainer() {
    const tasksArray = useSelector(state => state);

    const navigate = useNavigate();

    const [filter, setFilter] = useState(window.location.href.split('/').at(-1));

    useEffect(() => {
        const hrefFilter = window.location.href.split('/').at(-1);
        setFilter(hrefFilter);
    },[navigate]);

    return (
        <div className={style.container}>
            {tasksArray.map(task => {
                if ((filter === 'active' && !task.checked) ||
                        (filter === 'completed' && task.checked || !filter)){
                  return  <TaskTemplate key={task.id}
                                        title={task.title} checked={task.checked} id={task.id}/> ;
                }
            })}
        </div>
    );
}

export default TasksContainer;