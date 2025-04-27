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
    textField.placeholder = "Add your a task ...";
    addCategory.value = "";

    // Create new button
    let secondaryBtn = document.createElement("button");
    secondaryBtn.innerText = "Add new task"
    secondaryBtn.classList.add("miniBtn");

    // Delete container Button
    let deleteContainer = document.createElement("button");
    deleteContainer.classList.add("delete-conatiner");
    deleteContainer.innerText = "Delelete category";

     // Div that contains the second text area, "add new task" button and "delete container button"
     let miniContainer = document.createElement("div");
     miniContainer.classList.add("mini-container");
     miniContainer.appendChild(textField);
     miniContainer.appendChild(secondaryBtn);
     miniContainer.appendChild(deleteContainer);

    // Create checkbox
    let task = document.createElement("input");
    task.setAttribute("type", "checkbox");

    let categoryContainer = document.createElement("div");
    categoryContainer.classList.add("category-container");
    categoryContainer.appendChild(newtitle); // append newTitle
    categoryContainer.appendChild(miniContainer); 
    taskList.appendChild(categoryContainer); // append categoryContainer

    let newTaskList = document.createElement("div");
    newTaskList.classList.add("tasks");
    categoryContainer.appendChild(newTaskList);

    secondaryBtn.addEventListener("click", function () {

        let taskItem = document.createElement("input");
        taskItem.type = "checkbox";

        let label = document.createElement("label");
        label.innerText = textField.value;
        textField.value = "";

        let deleteBtn = document.createElement("button");
        deleteBtn.classList.add("delete-btn");
        deleteBtn.innerText = "Delete";

        let wrapper = document.createElement("div");
        wrapper.classList.add("wrapper");
        wrapper.appendChild(taskItem);
        wrapper.appendChild(label);
        wrapper.appendChild(deleteBtn);

        deleteBtn.addEventListener("click", function(){
            wrapper.remove();
        })

        newTaskList.appendChild(wrapper);
    });

    deleteContainer.addEventListener("click", function(){
        categoryContainer.remove();

    });

}

submitCategory.addEventListener("click", function () {
    let taskTitle = addCategory.value;
    createNewCategory(taskTitle);
});
