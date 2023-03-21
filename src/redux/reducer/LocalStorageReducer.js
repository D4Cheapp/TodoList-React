function initialState(){
    !!localStorage.getItem('todolist') ?? localStorage.setItem('todolist','[]')

    return  JSON.parse(localStorage.getItem('todolist'))
}

function localStorageReducer(state = initialState(), action){
    let newStorage = []

    switch (action.type){
        case 'ADD':
            newStorage = JSON.stringify(state.concat(action.task))
            localStorage.setItem('todolist', newStorage)
            return newStorage

        case 'DELETE':
            newStorage = JSON.stringify(state.filter(task => task.id !== action.id))
            localStorage.setItem('todolist', newStorage)
            return newStorage

        default:
            return state
    }
}

export default localStorageReducer