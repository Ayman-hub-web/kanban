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
    await downloadFromServer();
    formData = JSON.parse(backend.getItem('formData')) || [];
    login = JSON.parse(backend.getItem('login')) || [];
}

function register() {
    let x = document.getElementById('username');
    if (x.value != '') {
        alert('drin');
        login.push({ 'log': 1, 'username': x.value, 'password': '123456' });
        enter = true;
        addLogin();
        addEnter();
        window.location = "http://ayman-harbid.developerakademie.net/kanban1/index.html";
    } else {
        alert('Please write something');
    }
}