//Стартовое значение для store
import {createSlice} from "@reduxjs/toolkit";

//Начальное состояние хранилища
function initialState(){
    if (!localStorage.getItem('todolist')) {
        localStorage.setItem('todolist','[]');
    }

    return  JSON.parse(localStorage.getItem('todolist'));
}

//Функция сохранения состояния в локальное хранилище
function saveStateToLocalStorage(newStorage) {
    localStorage.setItem('todolist', JSON.stringify(newStorage));
}

//Редьюсер локального хранилища
const localStorageSlice = createSlice({
    name: 'localStorage',
    initialState,
    reducers: {
        //Добавление задачи
        addTask(state, task) {
            let newStorage = Array.from(state);

            newStorage.push(task.payload);

            saveStateToLocalStorage(newStorage);
            return newStorage;
        },

        //Удаление задачи
        deleteTaskAction(state, taskId) {
            let newStorage = Array.from(state);

            newStorage = newStorage.filter(task => task.id !== taskId.payload);

            saveStateToLocalStorage(newStorage);
            return newStorage;
        },

        //Изменение задачи
        taskEditAction(state, action) {
            let newStorage = Array.from(state);
            const {id, taskValue}  = action.payload;

            newStorage = newStorage.map(task => {
                if (task.id === id){
                    return {
                        ...task,
                        title: taskValue
                    };
                }
                return task;
            });

            saveStateToLocalStorage(newStorage);
            return newStorage;
        },

        //Выполнение / отмена выполнения задачи
        checkTaskAction(state, taskId) {
            let newStorage = Array.from(state);

            newStorage = newStorage.map(task => {
                if (task.id === taskId.payload){
                    return {
                        ...task,
                        checked: !task.checked
                    }
                }
                return task;
            });

            saveStateToLocalStorage(newStorage);
            return newStorage;
        },

        //Очистка выполненных задач
        clearCompletedAction(state) {
            let newStorage = Array.from(state);

            newStorage = newStorage.filter(task => !task.checked);

            saveStateToLocalStorage(newStorage);
            return newStorage;
        },

        //Переключение состояний на противоположные
        toggleStateAction(state) {
            let newStorage = Array.from(state);

            //Проверка на выполненность всех задач
            let isAllCompleted = newStorage.every(task => task.checked);

            newStorage = newStorage.map(task => {
                if (task.checked === isAllCompleted){
                    return {
                        ...task,
                        checked: !isAllCompleted
                    };
                }
                return task;
            });

            saveStateToLocalStorage(newStorage);
            return newStorage;
        },
    }
});

export const {addTask, checkTaskAction, deleteTaskAction,
    clearCompletedAction, taskEditAction, toggleStateAction} = localStorageSlice.actions;

export default localStorageSlice.reducer;