let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let tabs = document.querySelectorAll(".task-tabs div");
let taskList = [];
let mode = "all";
let filterList = [];
let underLine = document.getElementById("under-line");

addButton.addEventListener("click", addTask);

/*

*/

taskInput.addEventListener("focus", function () {
  taskInput.value = "";
});
taskInput.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    addTask();
  }
});

for (let i = 1; i < tabs.length; i++) {
  tabs[i].addEventListener("click", function (event) {
    filter(event);
  });
  tabs[i].addEventListener("click", function (event) {
    horizontalIndicator(event);
  });
}

function addTask() {
  if (taskInput.value == "") {
    return alert("할일을 추가해주세요");
  }
  let task = {
    id: randomIDGenerate(),
    taskContent: taskInput.value,
    isComplete: false,
  };
  taskList.push(task);
  console.log(taskList);

  render();
}

function render() {
  //내가 선택한 탭에 다라서
  let list = [];
  if (mode === "all") {
    list = taskList;
  } else if (mode === "notdone" || "done") {
    list = filterList;
  }
  //리스트를 다시 보여줌
  //all taskList
  //ongoing,done filterList

  let resultHTML = "";
  for (let i = 0; i < list.length; i++) {
    if (list[i].isComplete == true) {
      resultHTML += `<div class="task">
      <div class="task-done">${list[i].taskContent}</div>
      <div>
        <button class="button" onclick="toggleComplete('${list[i].id}')">Check</button>
        <button class="button" onclick="deleteTask('${list[i].id}')">Delete</button>
      </div>
    </div>`;
    } else {
      resultHTML += `<div class="task">
    <div>${list[i].taskContent}</div>
    <div>
      <button class="button" onclick="toggleComplete('${list[i].id}')">Check</button>
      <button class="button" onclick="deleteTask('${list[i].id}')">Delete</button>
    </div>
  </div>`;
    }
  }

  document.getElementById("task-board").innerHTML = resultHTML;
}

function toggleComplete(id) {
  console.log("id:", id);
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList[i].isComplete = !taskList[i].isComplete;
      break;
    }
  }
  render();
  console.log(taskList);
}

function deleteTask(id) {
  if (mode === "all") {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].id == id) {
        taskList.splice(i, 1);
        break;
      }
    }
    render();
  } else if (mode === "notdone" || "done") {
    for (let i = 0; i < filterList.length; i++) {
      if (filterList[i].id == id) {
        filterList.splice(i, 1);
        break;
      }
    }
    render();
  }
}

function filter(event) {
  mode = event.target.id;
  filterList = [];
  if (mode === "all") {
    render();
  } else if (mode === "notdone") {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete == false) {
        filterList.push(taskList[i]);
      }
    }
    render();
    console.log("진행중", filterList);
  } else if (mode === "done") {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete == true) {
        filterList.push(taskList[i]);
      }
    }
    render();
  }
}

function randomIDGenerate() {
  return "_" + Math.random().toString(36).substr(2, 9);
}

function horizontalIndicator(event) {
  underLine.style.left = event.currentTarget.offsetLeft + "px";
  underLine.style.width = event.currentTarget.offsetWidth + "px";
  underLine.style.top =
    event.currentTarget.offsetTop + event.currentTarget.offsetHeight + "px";
}
