function addTask(task) {
    return {type: 'ADD', task: task}
}

function deleteTaskAction(taskId) {
    return {type: 'DELETE', id: taskId}
}

function taskEditAction(taskId, taskTitle) {
    return {type: 'EDIT', id: taskId, title: taskTitle}
}

function checkTaskAction(taskId) {
    return {type: 'CHECK', id: taskId}
}

function clearCompletedAction() {
    return {type: 'CLEAR_COMPLETED'}
}

function toggleStateAction() {
    return {type: 'TOGGLE_ALL_STATE'}
}

export {addTask, deleteTaskAction, taskEditAction, checkTaskAction, clearCompletedAction, toggleStateAction};