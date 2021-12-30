let formData = [];
let login = [{ 'log': 0, 'username': 'ayman', 'password': '123456' }];
let enter = false;

async function addEnter() {
    await backend.setItem('enter', enter);
}
async function addLogin() {
    await backend.setItem('login', JSON.stringify(login));
}

async function addData() {
    await backend.setItem('formData', JSON.stringify(formData));
}
async function init() {
    enter = false;
    addEnter();
    await downloadFromServer();
    formData = JSON.parse(backend.getItem('formData')) || [];
    login = JSON.parse(backend.getItem('login')) || [];
}

function actionLogin() {
    let x = document.getElementById('username');
    let y = document.getElementById('password');
    // let element = { 'log': 1, 'username': x.value, 'password': y.value };
    for (let i = 0; i < login.length; i++) {
        if (x.value == login[i].username && y.value == login[i].password) {
            login[0]['log'] == 1;
            enter = true;
            addLogin();
            addEnter();
            window.location = "http://ayman-harbid.developerakademie.net/kanban1/index.html";
        }
    }
}