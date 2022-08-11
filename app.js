
let formContainer = document.getElementById('form-container');

const array = [
    {
        id: 1,
        type: "text",
        order: 1,
    }
];
let counter = 0;
let id = 2;



function generateInput(event) {
    let order = document.getElementsByClassName('element-container').length + 1;
    array.push({ id: id, type: event, order: order })
    type = event;
    createContainer()
    createLabel();
    createInput();
    createDelete();
    createDown();
    createUp();
    createAdd();
    id++;
    counter++;
}

function generateSideInput(element) {
    let value = array.find(el => el.id === element).order;
    let order = value + 1;
    for (let i = 0; i < array.length; i++) {
        if (array[i].order >= order) { 
            array[i].order = array[i].order + 1;
            let domElement = document.getElementById(`container${array[i].id}`);
            let newOrder = parseInt(domElement.style.order) + 1;
            console.log(newOrder);
            domElement.style.order = newOrder;
         }
    }
    array.push({ id: id, type: 'text', order: order });

    type = 'text';
    createSideContainer(value)
    createLabel();
    createInput();
    createDelete();
    createDown();
    createUp();
    createAdd();
    id++;
    counter++;
}



function createContainer() {
    let count = document.getElementsByClassName('element-container').length + 1;
    let newElement = document.createElement("DIV");
    newElement.setAttribute("class", "element-container");
    newElement.setAttribute("style", `order:${count}`);
    newElement.setAttribute("id", `container${id}`);
    formContainer.appendChild(newElement);
}

function createSideContainer(value) {
    let newElement = document.createElement("DIV");
    newElement.setAttribute("class", "element-container");
    newElement.setAttribute("style", `order:${value + 1}`);
    newElement.setAttribute("id", `container${id}`);
    formContainer.appendChild(newElement);
}


function createLabel() {
    let container = document.getElementById(`container${id}`);
    let newLabel = document.createElement("LABEL");
    newLabel.setAttribute("class", "label");
    newLabel.setAttribute("contenteditable", "true");
    container.appendChild(newLabel);

    switch (type) {
        case "identite":
            newLabel.textContent = 'Nom et Prénom du dirigeant';


            break; case "email":
            newLabel.textContent = 'Adresse E-mail';


            break;
        case "entreprise":
            newLabel.textContent = 'Raison sociale de l\' entreprise';


            break;
        case "telephone":
            newLabel.textContent = 'Numéro de téléphone';


            break;
        case "salaries":
            newLabel.textContent = 'Nombre de salariés de l\' entreprise';


            break;
        case "rgpd":
            newLabel.textContent = 'Acceptez-vous d\'être recontacter par la CPME Réunion ?';


            break;
        default:
            newLabel.textContent = 'Nouvelle question';

            break;
    }
}

function createInput() {
    let container = document.getElementById(`container${id}`);
    let newInput = document.createElement("INPUT");
    switch (type) {
        case "date":
            newInput.setAttribute("type", "date");
            newInput.setAttribute("class", "input");

            break;
        case "radio":
            newInput.setAttribute("type", "radio");
            newInput.setAttribute("class", "radio");

            break;
        case "rgpd":
            newInput.setAttribute("type", "radio");
            newInput.setAttribute("class", "radio");

            break;
        default:
            newInput.setAttribute("type", "text");
            newInput.setAttribute("class", "input");

            break;
    }
    newInput.setAttribute("placeholder", "Votre réponse");
    container.appendChild(newInput);
}

function createDelete() {
    let container = document.getElementById(`container${id}`);
    let newdelete = document.createElement('DIV');
    newdelete.setAttribute("class", "delete");
    newdelete.setAttribute("id", `delete${id}`);
    newdelete.setAttribute("name", id);
    newdelete.setAttribute("onclick", `destroyInput(${id})`);
    container.appendChild(newdelete);
}

function createUp() {
    let container = document.getElementById(`container${id}`);
    let newUp = document.createElement('DIV');
    newUp.setAttribute("class", "up");
    newUp.setAttribute("id", `up${id}`);
    newUp.setAttribute("name", id);
    newUp.setAttribute("onclick", `slideUp(${id})`);
    container.appendChild(newUp);
}


function createDown() {
    let container = document.getElementById(`container${id}`);
    let newDown = document.createElement('DIV');
    newDown.setAttribute("class", "down");
    newDown.setAttribute("id", `down${id}`);
    newDown.setAttribute("name", id);
    newDown.setAttribute("onclick", `slideDown(${id})`);
    container.appendChild(newDown);
}

function createAdd() {
    let container = document.getElementById(`container${id}`);
    let add = document.createElement('DIV');
    add.setAttribute("class", "editor-add");
    add.setAttribute("name", id);
    add.setAttribute("onclick", `generateSideInput(${id})`);
    container.appendChild(add);
    let img = document.createElement('IMG');
    img.setAttribute("src", "../img/add.svg");
    img.setAttribute("width", "16px");
    img.setAttribute("height", "16px");
    add.appendChild(img)
}


function destroyInput(id) {
    let element = array.find(el => el.id === id);
    for (let i = 0; i < array.length; i++) {
        if (array[i].order > element.order) {
            array[i].order -= 1;
        }

    }
    modifyDom(id);
    modifyArray(id);
}

function modifyDom(id) {
    let domElement = document.getElementById(`container${id}`);
    formContainer.removeChild(domElement);
}

function modifyArray(id) {
    const arrayElement = array.findIndex(object => {
        return object.id === id;
    })
    array.splice(arrayElement, 1);
}

function slideUp(id) {
    let newElement = array.find(el => el.id === id);
    let order = newElement.order;
    let replacedElement = array.find(el => el.order === order + 1);
    replacedElement.order = order;
    newElement.order += 1;
    document.getElementById(`container${id}`).style.order = `${order + 1}`;
    document.getElementById(`container${replacedElement.id}`).style.order = `${replacedElement.order}`;
}

function slideDown(id) {
    let newElement = array.find(el => el.id === id);
    let order = newElement.order;
    let replacedElement = array.find(el => el.order === order - 1);
    replacedElement.order = order;
    newElement.order -= 1;
    document.getElementById(`container${id}`).style.order = `${order - 1}`;
    document.getElementById(`container${replacedElement.id}`).style.order = `${replacedElement.order}`;
}
