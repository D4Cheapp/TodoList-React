//Добавление задачи
function addTask(task) {
    return {type: 'ADD', task: task}
}

//Удаление задачи
function deleteTaskAction(taskId) {
    return {type: 'DELETE', id: taskId}
}

//Изменение задачи
function taskEditAction(taskId, taskTitle) {
    return {type: 'EDIT', id: taskId, title: taskTitle}
}

//Выполнение / отмена выполнения задачи
function checkTaskAction(taskId) {
    return {type: 'CHECK', id: taskId}
}

//Очистка выполненных задач
function clearCompletedAction() {
    return {type: 'CLEAR_COMPLETED'}
}

//Переключение состояний на противоположные
function toggleStateAction() {
    return {type: 'TOGGLE_ALL_STATE'}
}

export {addTask, deleteTaskAction, taskEditAction, checkTaskAction, clearCompletedAction, toggleStateAction};