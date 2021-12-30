let formData = [];
let login = [{ 'log': 0, 'username': 'ayman', 'password': '123456' }];
let enter = false;

async function addEnter() {
    await backend.setItem('formData', JSON.stringify(enter));
}
async function addLogin() {
    await backend.setItem('login', JSON.stringify(login));
}

async function addData() {
    await backend.setItem('formData', JSON.stringify(formData));
}
async function init() {
    await downloadFromServer();
    enter = JSON.parse(backend.getItem('enter')) || '';
    if (enter == false) {
        window.location = "http://ayman-harbid.developerakademie.net/kanban1/login.html";
    }
    formData = JSON.parse(backend.getItem('formData')) || [];
    login = JSON.parse(backend.getItem('login')) || [];
    fillDiv();
}

/**
 * fill the board from showboard function with data
 * 
 * @param () 
 *
 */

function fillDiv() {
    console.log(formData);

    let high = document.getElementById('high');
    let medium = document.getElementById('medium');
    let low = document.getElementById('low');

    for (let i = 0; i < formData.length; i++) {
        if (formData[i].priority == 'high') {
            high.innerHTML += `<div class="card-more" ondragstart="startDragging(${i})" draggable="true" id="card${i}">
        <p>${formData[i].betreff}</p>
        <p>${formData[i].von}</p>
        <p>${formData[i].date}</p>
        </div>`;
        }
        if (formData[i].priority == 'medium') {
            medium.innerHTML += `<div class="card-more" ondragstart="startDragging(${i})" draggable="true" id="card${i}">
            <p>${formData[i].betreff}</p>
            <p>${formData[i].von}</p>
            <p>${formData[i].date}</p>
            </div>`;
        }
        if (formData[i].priority == 'low') {
            low.innerHTML += `<div class="card-more" ondragstart="startDragging(${i})" draggable="true" id="card${i}">
            <p>${formData[i].betreff}</p>
            <p>${formData[i].von}</p>
            <p>${formData[i].date}</p>
            </div>`;
        }
    }

}

// function makeLogin() {

//     if (login[0]['log'] == 0) {
//         // window.location.assign("http://127.0.0.1:5500/login.html");
//     }
// }



let currentDraggingElement;
/**
 * allow the drop from the different div's on board to drop data 
 * 
 * @param (name) name is an event
 */

function allowDrop(ev) {
    ev.preventDefault();
}
/**
 * This function allow to start dragging one element with an id from div to other div
 * 
 * @param (name) name is an id from an element who can dragged from a div to other
 */
function startDragging(key) {
    currentDraggingElement = key;
    console.log(currentDraggingElement);
}

/**
 * moveTo move data with an element from one div to other with an characteristic as parameter
 * 
 * @param (name)  name is a priority characteristic

 */
function moveTo(priority) {
    formData[currentDraggingElement]['priority'] = priority;
    addData();
    window.location = "http://ayman-harbid.developerakademie.net/kanban1/board.html";
}

function showBoard() {

    document.getElementById('board').innerHTML = `<div class="todo-around" id="around">
    <div class="todo todo-head" id="high" ondrop="moveTo('high')" ondragover="allowDrop(event)">
        <span>Todo</span></div>
  
    <div class="todo" id="medium" ondrop="moveTo('medium')" ondragover="allowDrop(event)">
        <span>In Progress</span>
    </div>
    <div class="todo" id="low" ondrop="moveTo('low')" ondragover="allowDrop(event)">
        <span>Testing</span>
    </div>
    <div class="todo" id="todo3" ondrop="moveTo('3')" ondragover="allowDrop(event)">
        <span>Done</span>
    </div>
    </div>`;
    fillDiv();
}

function deleteFormData(name) {
    backend.deleteItem(name);
}

function logout() {
    enter = false;
    addEnter();
    window.location = "http://ayman-harbid.developerakademie.net/kanban1/login.html";
}