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
            break

        case 'DELETE':
            newStorage = newStorage.filter(task => task.id !== action.id)
            break

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
            break

        case 'CLEAR_COMPLETED':
            newStorage = newStorage.filter(task => !task.checked)
            break

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
            break
    }

    localStorage.setItem('todolist', JSON.stringify(newStorage))
    return newStorage
}

export default localStorageReducer