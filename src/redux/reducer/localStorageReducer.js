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
            state.push(task.payload);
            saveStateToLocalStorage(state);
            return state
        },

        //Удаление задачи
        deleteTaskAction(state, taskId) {
            state = state.filter(task => task.id !== taskId.payload);
            saveStateToLocalStorage(state);
            return state
        },

        //Изменение задачи
        taskEditAction(state, action) {
            const {id, taskValue}  = action.payload;

            state = state.map(task => {
                if (task.id === id){
                    return {
                        ...task,
                        title: taskValue
                    };
                }
                return task;
            });

            saveStateToLocalStorage(state);
            return state
        },

        //Выполнение / отмена выполнения задачи
        checkTaskAction(state, taskId) {
            state = state.map(task => {
                if (task.id === taskId.payload){
                    return {
                        ...task,
                        checked: !task.checked
                    }
                }
                return task;
            });

            saveStateToLocalStorage(state);
            return state
        },

        //Очистка выполненных задач
        clearCompletedAction(state) {
            state = state.filter(task => !task.checked);
            saveStateToLocalStorage(state);
            return state
        },

        //Переключение состояний на противоположные
        toggleStateAction(state) {
            //Проверка на выполненность всех задач
            let isAllCompleted = state.every(task => task.checked);

            state = state.map(task => {
                if (task.checked === isAllCompleted){
                    return {
                        ...task,
                        checked: !isAllCompleted
                    };
                }
                return task;
            });

            saveStateToLocalStorage(state);
            return state
        },
    }
});

export const {addTask, checkTaskAction, deleteTaskAction,
    clearCompletedAction, taskEditAction, toggleStateAction} = localStorageSlice.actions;

export default localStorageSlice.reducer;