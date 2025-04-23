let submitCategory = document.querySelector(".btn");
let addCategory = document.querySelector(".category-txt");
let taskList = document.querySelector("#task-list");
let miniBtn = document.querySelector(".miniBtn");

function createNewCategory(taskTitle) {
    // Create h2 title
    let newtitle = document.createElement("h2");
    newtitle.classList.add("category-title");
    newtitle.innerText = taskTitle;// clean the text area after pressed send

    // Create secondary textarea
    let textField = document.createElement("textarea");
    textField.classList.add("newField");
    addCategory.value = "";

    // Create new button
    let secondaryBtn = document.createElement("button");
    secondaryBtn.innerText = "Add new task"
    secondaryBtn.classList.add("miniBtn");

    let task = document.createElement("input");
    task.setAttribute("type", "checkbox");

    let categoryContainer = document.createElement("div");
    categoryContainer.classList.add("category-container");
    categoryContainer.appendChild(newtitle); // append newTitle
    categoryContainer.appendChild(textField); // append textField
    categoryContainer.appendChild(secondaryBtn); // append secondaryBtn
    taskList.appendChild(categoryContainer); // append categoryContainer

    let newTaskList = document.createElement("div");
    newTaskList.classList.add("tasks");
    categoryContainer.appendChild(newTaskList)

    secondaryBtn.addEventListener("click", function () {

        let taskItem = document.createElement("input");
        taskItem.type = "checkbox";

        let label = document.createElement("label");
        label.innerText = textField.value;
        textField.value = "";

        let wrapper = document.createElement("div");
        wrapper.appendChild(taskItem);
        wrapper.appendChild(label);

        newTaskList.appendChild(wrapper);
    });
}

submitCategory.addEventListener("click", function () {
    let taskTitle = addCategory.value;
    createNewCategory(taskTitle);
});
