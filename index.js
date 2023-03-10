"use strict";
exports.__esModule = true;
var replace_string_1 = require("replace-string");
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
function addItem(input) {
    var newLi = document.createElement("li");
    ul.appendChild(newLi);
    var newLabel = document.createElement("label");
    newLabel.setAttribute("for", (0, replace_string_1["default"])(input, ' ', '_'));
    newLabel.textContent = input;
    newLi.appendChild(newLabel);
    /*  create checkbox */
    var checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    checkbox.setAttribute("class", "checkbox");
    checkbox.setAttribute("name", "checklist");
    checkbox.setAttribute("id", (0, replace_string_1["default"])(input, ' ', '_'));
    checkbox.addEventListener('change', function () {
        changeClass(checkbox.parentNode);
        updateValue(input, (checkbox.checked).toString()); //if true or false
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
