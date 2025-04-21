let submitcategory = document.querySelector(".btn");
let addCategory = document.querySelector(".category-txt");
let taskList = document.querySelector("#task-list");

function createNewCategory(taskTitle){
    let newtitle = document.createElement("h2");
    newtitle.classList.add("category-title");
    newtitle.innerText = taskTitle;

    let categoryContainer = document.createElement("div");
    categoryContainer.classList.add("category-container");
    categoryContainer.appendChild(newtitle);
    taskList.appendChild(categoryContainer);
}

submitcategory.addEventListener("click", function(){
    let taskTitle = addCategory.value;
    createNewCategory(taskTitle);
})
