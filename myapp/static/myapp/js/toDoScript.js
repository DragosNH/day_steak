let submitCategory = document.querySelector(".btn");
let addCategory = document.querySelector(".category-txt");
let taskList = document.querySelector("#task-list");

function createNewCategory(taskTitle){
    // Create h2 title
    let newtitle = document.createElement("h2");
    newtitle.classList.add("category-title");
    newtitle.innerText = taskTitle;

    // Create textarea
    let textField = document.createElement("textarea");
    textField.classList.add("newField");

    // Create new button
    let secondaryBtn = document.createElement("button");
    secondaryBtn.innerText = "Add new task"
    secondaryBtn.classList.add("miniBtn");

    let categoryContainer = document.createElement("div");
    categoryContainer.classList.add("category-container");
    categoryContainer.appendChild(newtitle); // append newTitle
    categoryContainer.appendChild(textField); // append textField
    categoryContainer.appendChild(secondaryBtn); // append secondaryBtn
    taskList.appendChild(categoryContainer); // append categoryContainer
    
}

submitCategory.addEventListener("click", function(){
    let taskTitle = addCategory.value;
    createNewCategory(taskTitle);
})
