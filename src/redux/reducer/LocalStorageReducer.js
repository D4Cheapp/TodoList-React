function initialState(){
    if (!localStorage.getItem('todolist')) {
        localStorage.setItem('todolist','[]')
    }

    return  JSON.parse(localStorage.getItem('todolist'))
}

function localStorageReducer(state = initialState(), action){
    let newStorage = Array.from(state)

    switch (action.type){
        case 'ADD':
            newStorage.push(action.task)
            localStorage.setItem('todolist', JSON.stringify(newStorage))
            return newStorage

        case 'DELETE':
            newStorage = newStorage.filter(task => task.id !== action.id)
            localStorage.setItem('todolist', JSON.stringify(newStorage))
            return newStorage

        case 'CHECK':
            newStorage.filter(task => {
                if (task.id === action.id){
                    task.checked = !task.checked
                }
                return task
            })
            localStorage.setItem('todolist', JSON.stringify(newStorage))
            return newStorage

        default:
            return state
    }
}

export default localStorageReducer