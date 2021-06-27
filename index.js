const formTodo = document.querySelector('#agregar-todo');
const mainContainer = document.querySelector('.main-container__todos--items');
const allBtn = document.querySelector('#all--todos');
const activeBtn = document.querySelector('#active--todos');
const completedBtn = document.querySelector('#completed--todos');
const themeBtn = document.querySelector('.icon');
const containerFilter = document.querySelector('.item-filter');
const body = document.querySelector('body');
const clearBtn = document.querySelector('#clear--todos');
let todos = [];
let filterTODOS = [];


//Classes

class UI {

    mostrarError(mensaje) {
        alert(mensaje);
    }

    loadHTML() {
        this.clearHTML();

        console.log('hola');
    }

    clearHTML() {
        while (mainContainer.firstChild) {
            mainContainer.removeChild(mainContainer.firstChild);
        }
    }

}

class TODOS {
    constructor() {
        this.todos = [];
    }

    addTodo(todo) {
        this.todos = [...this.todos, todo];
        console.log(todos);
    }
}

class TODO {
    constructor(description) {
        this.id = new Date().getTime();
        this.description = description;
        this.done = false;
    }
}

//instancias
const ui = new UI();
const todosArr = new TODOS();

//Listeners 
loadListeners();
function loadListeners() {
    formTodo.addEventListener('click', validarForm);

    // document.addEventListener('DOMContentLoaded', () => {
    //     todos = JSON.parse(localStorage.getItem('TODOS')) || [];
    //     console.log(todos)

    //     loadHTML(todos);
    // });
}

function validarForm(e) {
    e.preventDefault();

    const todo = document.querySelector('#form-input').value;

    if(todo === '' || todo.length < 3) {
        ui.mostrarError();
        return;
    }

    agregarTodo(todo);
}

function agregarTodo(todo) {
    const todoObj = new TODO(todo);
    // todoObj.id = new Date().getTime();

    todosArr.addTodo(todoObj);

    const formulario = document.querySelector('#formulario');
    formulario.reset();

    console.log(todosArr)
}

// function addTodo(e) {
//     e.preventDefault();


//     if (todo === '') {
//         alert('No puedes agregar un TODO vacio');
//         return;
//     }

//     const todoObj = {
//         id: Date.now(),
//         todo,
//         complete: false
//     };

//     todos = [...todos, todoObj];
//     syncStorage();
//     loadHTML();

//     formTodo.reset();
// }

// function loadHTML(todosArr = todos) {

//     cleanHTML();

//     if (todosArr.length > 0) {
//         todosArr.forEach(todo => {

//             const container = document.createElement('div');
//             container.classList.add('item', 'item--todo');
//             container.setAttribute('id', 'item');

//             const completed = document.createElement('a');
//             completed.classList.add('complete--todo');
//             completed.onclick = () => {
//                 completeTodo(todo.id)
//             }

//             const paragraphTodo = document.createElement('p');
//             paragraphTodo.textContent = todo.todo;

//             const spanDelete = document.createElement('span');
//             spanDelete.classList.add('todo--delete');
//             spanDelete.onclick = () => {
//                 deleteTodo(todo.id);
//             }

//             container.appendChild(completed);
//             container.appendChild(paragraphTodo);
//             container.appendChild(spanDelete);


//             mainContainer.appendChild(container);
//         });
//     }

//     syncStorage();
// }

// function cleanHTML() {

// }

// function completeTodo(id) {
//     let todosUpdated = todos.map(todo => {

//         if (todo.id === id) {


//             if (todo.complete) {
//                 todo.complete = false;
//                 syncStorage();
//                 return todo;
//             } else {
//                 todo.complete = true;
//                 syncStorage();

//                 return todo;
//             }
//         } else {
//             return todo;
//         }
//     })

//     todos = [...todosUpdated];
// }

// function deleteTodo(id) {
//     todos = todos.filter(todo => todo.id !== id);
//     loadHTML();
// }

// function syncStorage() {
//     localStorage.setItem('TODOS', JSON.stringify(todos));
// }

// function allTodos() {
//     loadHTML();
// }

// function activeFilter() {

//     filterTODOS = todos.filter(todo => todo.complete === false);

//     loadHTML(filterTODOS);
// }

// function completedFilter() {

//     filterTODOS = todos.filter(todo => todo.complete === true);
//     loadHTML(filterTODOS);
//     console.log(filterTODOS)
// }

// function clearCompleted() {
//     todos = todos.filter(todo => todo.complete !== true);
//     loadHTML();
//     syncStorage();
// }