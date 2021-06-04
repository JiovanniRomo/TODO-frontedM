const formTodo = document.querySelector('#formulario');
const mainContainer = document.querySelector('.main-container__todos--items');
const allBtn = document.querySelector('#all--todos');
const activeBtn = document.querySelector('#active--todos');
const completedBtn = document.querySelector('#completed--todos');
const themeBtn = document.querySelector('.icon');
const body = document.querySelector('body');
let todos = [];
let todosFiltrados = [];


//Listeners 
loadListeners();
function loadListeners() {
    formTodo.addEventListener('submit', addTodo);

    document.addEventListener('DOMContentLoaded', () => {
        todos = JSON.parse(localStorage.getItem('TODOS')) || [];
        console.log(todos)

        const item = document.querySelectorAll('.item--todo');

        loadHTML(todos);
    });

    allBtn.addEventListener('click', allTodos);

    activeBtn.addEventListener('click', activeFilter);

    completedBtn.addEventListener('click', completedFilter);

    themeBtn.addEventListener('click', changeTheme);
}

function addTodo(e) {
    e.preventDefault();

    const todo = document.querySelector('#form-input').value;

    if (todo === '') {
        alert('No puedes agregar un TODO vacio');
        return;
    }

    const todoObj = {
        id: Date.now(),
        todo,
        complete: false
    };

    todos = [...todos, todoObj];
    syncStorage();
    loadHTML();

    formTodo.reset();
}

function loadHTML(todosArr = todos) {

    cleanHTML();

    if (todosArr.length > 0) {
        todosArr.forEach(todo => {

            const container = document.createElement('div');
            container.classList.add('item', 'item--todo');
            container.setAttribute('id', 'item');

            const completed = document.createElement('a');
            completed.textContent = 'X'
            completed.classList.add('todo--completed');
            completed.addEventListener('click', () => {
                completeTodo(todo.id);
            });

            const paragraphTodo = document.createElement('p');
            paragraphTodo.textContent = todo.todo;

            const spanDelete = document.createElement('span');
            spanDelete.classList.add('todo--delete');
            spanDelete.onclick = () => {
                deleteTodo(todo.id);
            }

            container.appendChild(completed);
            container.appendChild(paragraphTodo);
            container.appendChild(spanDelete);


            mainContainer.appendChild(container);
        });
    }

    syncStorage();
}

function cleanHTML() {
    while (mainContainer.firstChild) {
        mainContainer.removeChild(mainContainer.firstChild);
    }
}

function completeTodo(id) {
    let todosUpdated = todos.map(todo => {
        if(todo.id === id) {
            if(todo.complete) {
                todo.complete = false;
                syncStorage()
                return todo;
            } else {
                todo.complete = true;
                syncStorage()
                return todo
            }
            return todo;
        } else {
            return todo;
        }
    })

    todos = [...todosUpdated];
    console.log(todos);
}

function changeTheme() {

    const item = document.querySelector('.item');
    console.log(item);

    if (body.classList.contains('dark')) {
        body.classList.remove('dark');
        body.classList.add('light');
        formTodo.classList.add('form--light');
    } else if (body.classList.contains('light')) {
        formTodo.classList.remove('form--light');
        body.classList.remove('light');
        body.classList.add('dark');
        console.log('its light')
    }
}

function deleteTodo(id) {
    todos = todos.filter(todo => todo.id !== id);
    loadHTML();
}

function syncStorage() {
    localStorage.setItem('TODOS', JSON.stringify(todos));
}

function allTodos() {
    console.log('Loading all TODOS')
    loadHTML();
}

function activeFilter() {
    console.log('Filtrando por activos');
    todosFiltrados = todos.filter(todo => todo.complete === false);

    loadHTML(todosFiltrados);
}

function completedFilter() {
    console.log('Filtrando todos completados');

    todosFiltrados = todos.filter(todo => todo.complete === true);
    loadHTML(todosFiltrados);
    console.log(todosFiltrados)
}