let body = document.querySelector('body')
let todoBody = document.querySelector('.todo_menu')
let plusTodo = document.querySelector('.plus')
let backGround = document.querySelector('.bg_blur')
let addForm = document.querySelector('.add')
let addNewTodo = document.querySelector('.add_actions_applay')
let cancelNewTodo = document.querySelector('.add_actions_cancel')
let newTodoInput = document.querySelector('.add_todo')
let editForm = document.querySelector('.edit')
let editInput = document.querySelector('.edit_todo')
let saveEdit = document.querySelector('.edit_actions_applay')
let cancelEdit = document.querySelector('.edit_actions_cancel')
let searchInput = document.querySelector('.todo_actions_search')

let darkTheme = document.querySelector('.todo_actions_theme_dark')
let lightTheme = document.querySelector('.todo_actions_theme_light')

let data = []
let notCompletedTodos = []

async function todos() {
    let response = await fetch('https://dummyjson.com/todos')
    const jsonData = await response.json()
    data = jsonData.todos
    console.log(data);

    render(data)


    notCompletedTodos = data.filter(todo => todo.completed === false);

    console.log(notCompletedTodos);
}

todos()

function render(todos) {
    todoBody.innerHTML = ''
    todos.forEach((todo) => {
        let template = document.querySelector('#todos')
        let clone = document.importNode(template.content, true)

        let text = clone.querySelector('.todo_menu_row_text')
        let checkBox = clone.querySelector('.todo_menu_row_check')
        let todoName = clone.querySelector('.todo_menu_row_text')

        let editBtn = clone.querySelector('.edit_todo_btn')
        let deleteBtn = clone.querySelector('.delete_todo_btn')
        let saveChangesBtn = document.querySelector('.edit_actions_applay')
        saveChangesBtn.setAttribute('onclick', `saveChanges(${todo.id})`)

        deleteBtn.onclick = () => {
            fetch(`https://dummyjson.com/todos/${todo.id}`, {
                method: 'DELETE',
            })
                .then(res => res.json())
                .then(console.log);
        }

        editBtn.onclick = () => {
            backGround.style.display = 'block'
            editForm.style.display = 'block'

            editInput.value = todo.todo
            editInput.setAttribute('userId', `${todo.id}`)
        }

        clone.querySelector('.todo_menu_row_text').textContent = todo.todo

        if (todo.completed) {
            clone.querySelector('.todo_menu_row_check').checked = true;
            text.style.textDecoration = 'line-through'

            text.style.color = '#25252580'
        }

        checkBox.onclick = () => {
            if (checkBox.checked == true) {
                console.log('hello');
                todoName.setAttribute('data-user-id', `${todo.id}`)
                text.style.textDecoration = 'line-through'
                text.style.color = ' #25252580'

            } else {
                todoName.removeAttribute('data-user-id')
                text.style.textDecoration = 'none'
                text.style.color = 'black'
            }
        }



        darkTheme.addEventListener('click', () => {
            let tasks = document.querySelectorAll('.todo_menu_row_text')
            let title = document.querySelector('.todo_title')
            tasks.forEach(task => {
                if (!todo.completed) {
                    task.style.color = 'white'
                }
            })
            darkTheme.style.display = 'none'
            lightTheme.style.display = 'flex'
            lightTheme.style.marginLeft = '8px'
            body.style.backgroundColor = 'black'
            title.style.color = 'white'
        })

        lightTheme.addEventListener('click', () => {
            let todos = document.querySelectorAll('.todo_menu_row_text')
            let title = document.querySelector('.todo_title')

            todos.forEach(item => {
                if (!todo.completed) {
                    item.style.color = '#343434'
                    
                }
            })
            lightTheme.style.display = 'none'
            darkTheme.style.marginLeft = '8px'
            darkTheme.style.display = 'flex'
            body.style.backgroundColor = 'white'
            title.style.color = '#343434'

        })

        todoBody.append(clone)
    });
}

plusTodo.onclick = () => {
    backGround.style.display = 'block'
    addForm.style.display = 'block'
}

backGround.onclick = () => {
    backGround.style.display = 'none'
    addForm.style.display = 'none'
    editForm.style.display = 'none'

}

addNewTodo.addEventListener('click', () => {
    fetch('https://dummyjson.com/todos/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            todo: newTodoInput.value,
            completed: false,
            userId: data.length + 1,
        })
    })
        .then(res => res.json())
        .then(console.log);

    backGround.style.display = 'none'
    addForm.style.display = 'none'

    newTodoInput.value = ''
})

cancelNewTodo.onclick = () => {
    backGround.style.display = 'none'
    addForm.style.display = 'none'
}

function saveChanges(userId) {
    let id = document.querySelector(".edit_todo").getAttribute("userId");
    console.log(id);

    fetch(`https://dummyjson.com/todos/${id}`, {
        method: 'PUT', /* or PATCH */
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            todo: editInput.value,
            completed: false,
        })
    })
        .then(res => res.json())
        .then(console.log);

    document.querySelector(".edit_todo").removeAttribute("userId");
}

cancelEdit.onclick = () => {
    backGround.style.display = 'none'
    addForm.style.display = 'none'
    editForm.style.display = 'none'
}

saveEdit.addEventListener('click', () => {
    backGround.style.display = 'none'
    editForm.style.display = 'none'
})

function searchedTodo() {
    let searched = data.filter(todo => {
        return todo.todo.toLowerCase().includes(searchInput.value)
    })

    render(searched)
}

function notComplated(currentType) {

    
    render(notCompletedTodos)
}
