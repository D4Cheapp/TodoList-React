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

        case 'EDIT':
            newStorage = newStorage.map(task => {
                if (task.id === action.id){
                    return {
                        ...task,
                        title: action.title
                    }
                }
                return task
            })
            localStorage.setItem('todolist', JSON.stringify(newStorage))
            return newStorage

        case 'CHECK':
            newStorage = newStorage.map(task => {
                if (task.id === action.id){
                    return {
                        ...task,
                        checked: !task.checked
                    }
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