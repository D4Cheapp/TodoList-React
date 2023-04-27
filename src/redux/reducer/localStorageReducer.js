//Стартовое значение для store
function initialState(){
    if (!localStorage.getItem('todolist')) {
        localStorage.setItem('todolist','[]');
    }

    return  JSON.parse(localStorage.getItem('todolist'));
}

//Редьюсер локального хранилища
function localStorageReducer(state = initialState(), action){
    let newStorage = Array.from(state);

    switch (action.type){
        //Добавление задачи
        case 'ADD':{
            newStorage.push(action.task);
            break;
        }

        //Удаление задачи
        case 'DELETE':{
            newStorage = newStorage.filter(task => task.id !== action.id);
            break;
        }

        //Изменение задачи
        case 'EDIT':{
            newStorage = newStorage.map(task => {
                if (task.id === action.id){
                    return {
                        ...task,
                        title: action.title
                    };
                }
                return task;
            });
            break;
        }

        //Выполнение / отмена выполнения задачи
        case 'CHECK':{
            newStorage = newStorage.map(task => {
                if (task.id === action.id){
                    return {
                        ...task,
                        checked: !task.checked
                    }
                }
                return task;
            });
            break;
        }

        //Очистка выполненных задач
        case 'CLEAR_COMPLETED':{
            newStorage = newStorage.filter(task => !task.checked);
            break;
        }

        //Переключение состояний на противоположные
        case 'TOGGLE_ALL_STATE':{
            let isAllCompleted = true;

            //Проверка на выполненность всех задач
            for (let task of newStorage) {
                if (!task.checked) {
                    isAllCompleted = false;
                    break;
                }
            }

            newStorage = newStorage.map(task => {
                if (task.checked === isAllCompleted){
                    return {
                        ...task,
                        checked: !isAllCompleted
                    };
                }
                return task;
            });

            break;
        }

        //Действие по умолчанию
        default:{
            return newStorage;
        }
    }

    localStorage.setItem('todolist', JSON.stringify(newStorage));
    return newStorage;
}

export default localStorageReducer;