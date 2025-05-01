let submitCategory = document.querySelector(".btn");
let addCategory = document.querySelector(".category-txt");
let taskList = document.querySelector("#task-list");

// Get CSRF token from cookie
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let cookie of cookies) {
            cookie = cookie.trim();
            if (cookie.startsWith(name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

const csrfToken = getCookie('csrftoken');

// Create a new category in the frontend
function createNewCategory(taskTitle, categoryId) {
    // Create title
    let newtitle = document.createElement("h2");
    newtitle.classList.add("category-title");
    newtitle.innerText = taskTitle;
    addCategory.value = "";

    // Textarea for tasks
    let textField = document.createElement("textarea");
    textField.classList.add("newField");
    textField.placeholder = "Add your task...";

    // Add task button
    let secondaryBtn = document.createElement("button");
    secondaryBtn.innerText = "Add new task";
    secondaryBtn.classList.add("miniBtn");

    // Delete category button
    let deleteContainer = document.createElement("button");
    deleteContainer.classList.add("delete-container");
    deleteContainer.innerText = "Delete category";

    // Mini container (input + buttons)
    let miniContainer = document.createElement("div");
    miniContainer.classList.add("mini-container");
    miniContainer.appendChild(textField);
    miniContainer.appendChild(secondaryBtn);
    miniContainer.appendChild(deleteContainer);

    // Category container
    let categoryContainer = document.createElement("div");
    categoryContainer.classList.add("category-container");
    categoryContainer.setAttribute("data-id", categoryId);
    categoryContainer.appendChild(newtitle);
    categoryContainer.appendChild(miniContainer);
    taskList.appendChild(categoryContainer);

    // Task list inside category
    let newTaskList = document.createElement("div");
    newTaskList.classList.add("tasks");
    categoryContainer.appendChild(newTaskList);

    // Add task button click
    secondaryBtn.addEventListener("click", function () {
        const taskDescription = textField.value.trim();
        if (!taskDescription) return;
        textField.value = "";

        let taskItem = document.createElement("input");
        taskItem.type = "checkbox";

        let label = document.createElement("label");
        label.innerText = taskDescription;

        let deleteBtn = document.createElement("button");
        deleteBtn.classList.add("delete-btn");
        deleteBtn.innerText = "Delete";

        let wrapper = document.createElement("div");
        wrapper.classList.add("wrapper");
        wrapper.appendChild(taskItem);
        wrapper.appendChild(label);
        wrapper.appendChild(deleteBtn);
        newTaskList.appendChild(wrapper);

        deleteBtn.addEventListener("click", function () {
            wrapper.remove();
        });

        // Save task to backend
        const categoryId = categoryContainer.getAttribute("data-id");
        fetch("/api/tasks/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": csrfToken
            },
            body: JSON.stringify({
                description: taskDescription,
                completed: false,
                category: categoryId
            })
        })
        .then(response => response.json())
        .then(data => console.log("Task saved:", data))
        .catch(error => console.error("Task error:", error));
        console.log("Trying to save task:", taskDescription);

    });

    textField.addEventListener("keydown", function (e) {
        if (e.key === "Enter") {
            e.preventDefault();
            secondaryBtn.click();
        }
    });

    deleteContainer.addEventListener("click", function () {
        categoryContainer.remove();
    });
}

submitCategory.addEventListener("click", function () {
    let taskTitle = addCategory.value.trim();
    if (!taskTitle) return;

    fetch("/api/categories/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrfToken
        },
        body: JSON.stringify({ title: taskTitle })
    })
    .then(response => response.json())
    .then(data => {
        const categoryId = data.id;
        createNewCategory(taskTitle, categoryId);
    })
    .catch(error => {
        console.error("Category save error:", error);
    });
});

// Enter key to add category
addCategory.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        e.preventDefault();
        submitCategory.click();
    }
});

window.addEventListener("DOMContentLoaded", function () {
    fetch("/api/categories/", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(response => response.json())
    .then(data => {
        data.forEach(category => {
            createNewCategory(category.title, category.id);
        });
    })
    .catch(error => {
        console.error("Failed to load categories:", error);
    });

    fetch("/api/tasks/", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(response => response.json())
    .then(tasks => {
        tasks.forEach(task => {
            const categoryContainer = document.querySelector(`[data-id="${task.category}"]`);
            if (!categoryContainer) return;
        
            const newTaskList = categoryContainer.querySelector(".tasks");
        
            const taskItem = document.createElement("input");
            taskItem.type = "checkbox";
            taskItem.checked = task.completed;
        
            taskItem.addEventListener("change", function () {
                fetch(`/api/tasks/${task.id}/`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        "X-CSRFToken": csrfToken
                    },
                    body: JSON.stringify({ completed: taskItem.checked })
                })
                .then(res => res.json())
                .then(data => console.log("Task updated:", data))
                .catch(err => console.error("Update error:", err));
            });
        
            const label = document.createElement("label");
            label.innerText = task.description;
        
            const deleteBtn = document.createElement("button");
            deleteBtn.classList.add("delete-btn");
            deleteBtn.innerText = "Delete";
        
            const wrapper = document.createElement("div");
            wrapper.classList.add("wrapper");
            wrapper.appendChild(taskItem);
            wrapper.appendChild(label);
            wrapper.appendChild(deleteBtn);
        
            deleteBtn.addEventListener("click", function () {
                wrapper.remove();
            });
        
            newTaskList.appendChild(wrapper);
        });
        
        
    })
    .catch(error => {
        console.error("Failed to load tasks:", error);
    });
    
});
