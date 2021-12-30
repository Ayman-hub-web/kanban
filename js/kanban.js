let formData = [];
let login = [{ 'log': 1, 'username': 'ayman', 'password': '123456' }];
let enter = false;

function sendInfo() {
    let betreff = document.getElementById('betreff').value;
    let von = document.getElementById('erstellt_von').value;
    let date = document.getElementById('date').value;
    let notiz = document.getElementById('notiz').value;
    let priority = document.getElementById('priority').value;
    let category = document.getElementById('category').value;
    if (betreff != '' && von != '' && date != '' && notiz != '' && priority != '' && category != '') {
        formData.push({ 'betreff': betreff, 'von': von, 'date': date, 'notiz': notiz, 'priority': priority, 'category': category });
        document.getElementById('betreff').value = '';
        document.getElementById('erstellt_von').value = '';
        document.getElementById('date').value = '';
        document.getElementById('notiz').value = '';
        document.getElementById('priority').value = '';
        document.getElementById('category').value = '';
        addData();

    } else {
        alert('Bitte Felder ausfüllen');
    }
}
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
    backlog();
}

function makeLogin() {
    if (login['log'] == 0) {
        document.getElementById('input-form').innerHTML = ` <form>
        <div class="mb-3">
            <label for="username" class="form-label">Usrename</label>
            <input type="text" class="form-control" id="username" required>
        </div>
        <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input type="password" class="form-control" id="password">
        </div>
        <button type="submit" class="btn btn-primary" onclick="actionLogin()">Login</button>
    </form>`;
    }
}

function logout() {
    window.location = "http://ayman-harbid.developerakademie.net/kanban1/login.html";
}

function backlog() {
    console.log("Länge:", formData.length);
    for (let i = 0; i < formData.length; i++) {
        if (formData.betreff != '' && formData.von != '' && formData.date != '' && formData.category != '' && formData.priority != '') {
            document.getElementById('tickets').innerHTML += `<div class="card">
        <div class="card-body">
        <a href="#">${formData[i].betreff}</a><a href="#" class="date">${formData[i].date}</a><a href="#">${formData[i].category}</a><a href="#" id="priority${i}">${formData[i].priority}</a>
        </div>
    </div>`;

            if (formData[i].priority == 'high') {
                document.getElementById('priority' + i).style.color = 'red';
            }
            if (formData[i].priority == 'medium') {
                document.getElementById('priority' + i).style.color = 'yellow';
            }
            if (formData[i].priority == 'low') {
                document.getElementById('priority' + i).style.color = 'green';
            }
        }
    }
}


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
    //showBoard();
}

/**
 * this is an search function used in boardlock for search 
 * 
 * @param () 

 */
function search() {
    let x = document.getElementById('search');
    document.getElementById('tickets').innerHTML = '';
    document.getElementById('tickets').innerHTML = `<div class="search-div"><input type="text" class="form-control" id="search"><button class="btn btn-primary" onclick="search()">Search</button></div>`;
    for (let i = 0; i < formData.length; i++) {
        if (x.value.toLowerCase() == formData[i].betreff.toLowerCase() || x.value == formData[i].date || x.value == formData[i].category.toLowerCase()) {
            document.getElementById('tickets').innerHTML += `<div class="card">
            <div class="card-body">
            <a href="#">${formData[i].betreff}</a><a href="#" class="date">${formData[i].date}</a><a href="#">${formData[i].category}</a><a href="#" id="priority${i}">${formData[i].priority}</a>
            </div>
        </div>`;
            if (formData[i].priority == 'high') {
                document.getElementById('priority' + i).style.color = 'red';
            }
            if (formData[i].priority == 'medium') {
                document.getElementById('priority' + i).style.color = 'yellow';
            }
            if (formData[i].priority == 'low') {
                document.getElementById('priority' + i).style.color = 'green';
            }
        }
    }
}
/**
 * toggle function for menu in responsive screen
 * 
 * @param () 

 */
function toggle() {
    var x = document.getElementById('menu-responsive');
    if (x.style.display === "none") {
        x.style.display = "flex";
    } else {
        x.style.display = "none";
    }
}