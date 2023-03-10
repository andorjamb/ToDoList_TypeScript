var item = document.querySelector("#item");
var form = document.querySelector("form");
var ul = document.querySelector("ul");
var reset = document.querySelector('#reset');
var checkboxes;
function getAllFromStorage() {
    if (localStorage.length > 0) {
        for (var i in localStorage) {
            if (localStorage.getItem(i) == 'true') {
                localStorage.removeItem(i);
            }
        }
        var toDoArray = Object.keys(localStorage);
        toDoArray.forEach(function (item) { return addItem(item); });
    }
}
function convertSpaces(array) {
    array = array.map(function (element) { return element.replace(' ', '_'); });
    return array.join('');
}
function addItem(input) {
    var newLi = document.createElement("li");
    ul.appendChild(newLi);
    var newLabel = document.createElement("label");
    var newNameArray = input.split('');
    var newName = convertSpaces(newNameArray);
    newLabel.setAttribute("for", newName);
    newLabel.textContent = input;
    newLi.appendChild(newLabel);
    var checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    checkbox.setAttribute("class", "checkbox");
    checkbox.setAttribute("name", "checklist");
    checkbox.setAttribute("id", newName);
    checkbox.addEventListener('change', function () {
        changeClass(checkbox.parentNode);
        updateValue(input, (checkbox.checked).toString());
    });
    newLabel.insertAdjacentElement('beforeend', checkbox);
    return checkboxes = document.querySelectorAll('.checkbox');
}
function storeItem(input) {
    localStorage.setItem(input, 'false');
}
function resetList() {
    localStorage.clear();
    ul.innerHTML = '';
}
function changeClass(e) {
    e.parentNode.classList.toggle('strike-through');
}
function updateValue(input, value) {
    localStorage.setItem(input, value);
}
window.onload = function () {
    getAllFromStorage();
};
form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (item.value) {
        addItem(item.value);
        storeItem(item.value);
        item.value = "";
    }
});
reset.addEventListener('click', function () {
    resetList();
    return (console.log('local storage cleared.'));
});
