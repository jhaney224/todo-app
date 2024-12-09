fetch(`https://wwxcw4-3000.csb.app/api/todos/`)
  .then((response) => response.json())
  .then((result) => {
    const tasksSorted = getTasksSorted(result);

    const tasksToDisplay = tasksSorted
      .map((task) => {
        const encodedTaskName = encodeURIComponent(task.name);

        return `<tr>
        <td>${task.name}</td>
        <td style="color: white; background-color: ${colorCompletionCell(
          task.completed
        )};">${turnBooleanToYesOrNo(task.completed)}</td>
        <td>
          <button class="action" data-task-name="${
            task.name
          }" onclick="toggleTaskComplete(this)">Toggle Completion</button>
        </td>
        <td>
          <button class="action" data-task-name="${
            task.name
          }" onclick="editTask(this)">Edit Task</button>
        </td>
        <td>
          <button class="action" data-task-name="${
            task.name
          }" onclick="deleteTask(this)">Delete Task</button>
        </td>
      </tr>`;
      })
      .join("");

    document.getElementById(
      "app"
    ).innerHTML = `<table><tr><th>Task</th><th>Completed?</th><th colspan="3">Actions</th></tr>${tasksToDisplay}</table>`;
  });

document.getElementById("add").addEventListener("click", function () {
  let taskName = prompt("Please enter the task you want to complete.");

  if (taskName) {
    fetch(`https://wwxcw4-3000.csb.app/api/todos/create?todo=${taskName}`).then(
      (response) => response.json()
    );
    showSuccess(`Added ${taskName}! Refreshing.`);
  }
});

function toggleTaskComplete(button) {
  const taskName = button.getAttribute("data-task-name");
  fetch(`https://wwxcw4-3000.csb.app/api/todos/complete?name=${taskName}`).then(
    (response) => response.json()
  );
  showSuccess(`Toggled ${taskName} completion! Refreshing.`);
}

function editTask(button) {
  const taskName = button.getAttribute("data-task-name");
  let newTaskName = prompt(
    `Please enter the new task name to replace task '${taskName}'.`
  );

  if (newTaskName) {
    fetch(
      `https://wwxcw4-3000.csb.app/api/todos/edit?todo=${taskName}&newName=${newTaskName}`
    ).then((response) => response.json());
    showSuccess(`Edited ${taskName}! Refreshing.`);
  }
}

function deleteTask(button) {
  const taskName = button.getAttribute("data-task-name");
  let confirmDelete = window.confirm(
    `Are you sure you want to delete task '${taskName}'?`
  );

  if (confirmDelete) {
    fetch(`https://wwxcw4-3000.csb.app/api/todos/delete?todo=${taskName}`).then(
      (response) => response.json()
    );
    showSuccess(`Removed ${taskName}! Refreshing.`);
  }
}

function turnBooleanToYesOrNo(boolean) {
  return boolean ? "Yes" : "No";
}

function colorCompletionCell(boolean) {
  return boolean ? "green" : "red";
}

function showSuccess(action) {
  document.getElementById("success").innerHTML = `<h2>✅ ${action}</h2>`;
  setTimeout(location.reload(), 30000);
}

function getTasksSorted(tasks) {
  return tasks.sort((a, b) => {
    return a.completed === b.completed ? 0 : a.completed ? 1 : -1;
  });
}
