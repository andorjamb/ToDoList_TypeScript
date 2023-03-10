const item: HTMLInputElement = document.querySelector("#item")!;
const form = document.querySelector("form");
const ul = document.querySelector("ul");
const reset = document.querySelector('#reset');
let checkboxes;

function getAllFromStorage() {
    if (localStorage.length > 0) {
        for (const i in localStorage) {
            if (localStorage.getItem(i) == 'true') {
                localStorage.removeItem(i);
            }
        }
        let toDoArray = Object.keys(localStorage);
        toDoArray.forEach((item) => addItem(item));
    }
}


function addItem(input: string) {
    let newLi = document.createElement("li");
    ul!.appendChild(newLi);
    let newLabel = document.createElement("label");
    newLabel.setAttribute("for", replaceString(input, ' ', '_'));
    newLabel.textContent = input;
    newLi.appendChild(newLabel);

    let checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    checkbox.setAttribute("class", "checkbox");
    checkbox.setAttribute("name", "checklist");
    checkbox.setAttribute("id", replaceString(input, ' ', '_'));
    checkbox.addEventListener('change', function () {
        changeClass(checkbox.parentNode);
        updateValue(input, (checkbox.checked).toString());
    })

    newLabel.insertAdjacentElement('beforeend', checkbox);
    return checkboxes = document.querySelectorAll('.checkbox');
}

function storeItem(input: string) {
    localStorage.setItem(input, 'false');
}

function resetList() {
    localStorage.clear();
    ul!.innerHTML = '';
}

function changeClass(e: any) {
    e.parentNode.classList.toggle('strike-through')
}

function updateValue(input: string, value: string) {
    localStorage.setItem(input, value);
}


window.onload = () => {
    getAllFromStorage();
}

form!.addEventListener('submit', (e) => {
    e.preventDefault();
    if (item!.value) {
        addItem(item.value);
        storeItem(item.value);
        item.value = "";
    }
}
);

reset!.addEventListener('click', () => {
    resetList();
    return (console.log('local storage cleared.'))
}
);


