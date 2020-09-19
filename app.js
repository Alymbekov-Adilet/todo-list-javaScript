const tasks = [
  {
    _id: "5d2ca9e2e03d40b326596aa7",
    completed: true,
    body:
      "Occaecat non ea quis occaecat ad culpa amet deserunt incididunt elit fugiat pariatur. Exercitation commodo culpa in veniam proident laboris in. Excepteur cupidatat eiusmod dolor consectetur exercitation nulla aliqua veniam fugiat irure mollit. Eu dolor dolor excepteur pariatur aute do do ut pariatur consequat reprehenderit deserunt.\r\n",
    title: "Eu ea incididunt sunt consectetur fugiat non.",
  },
  {
    _id: "5d2ca9e29c8a94095c1288e0",
    completed: false,
    body:
      "Aliquip cupidatat ex adipisicing veniam do tempor. Lorem nulla adipisicing et esse cupidatat qui deserunt in fugiat duis est qui. Est adipisicing ipsum qui cupidatat exercitation. Cupidatat aliqua deserunt id deserunt excepteur nostrud culpa eu voluptate excepteur. Cillum officia proident anim aliquip. Dolore veniam qui reprehenderit voluptate non id anim.\r\n",
    title:
      "Deserunt laborum id consectetur pariatur veniam occaecat occaecat tempor voluptate pariatur nulla reprehenderit ipsum.",
  },
  {
    _id: "5d2ca9e2e03d40b3232496aa7",
    completed: true,
    body:
      "Occaecat non ea quis occaecat ad culpa amet deserunt incididunt elit fugiat pariatur. Exercitation commodo culpa in veniam proident laboris in. Excepteur cupidatat eiusmod dolor consectetur exercitation nulla aliqua veniam fugiat irure mollit. Eu dolor dolor excepteur pariatur aute do do ut pariatur consequat reprehenderit deserunt.\r\n",
    title: "Eu ea incididunt sunt consectetur fugiat non.",
  },
  {
    _id: "5d2ca9e29c8a94095564788e0",
    completed: false,
    body:
      "Aliquip cupidatat ex adipisicing veniam do tempor. Lorem nulla adipisicing et esse cupidatat qui deserunt in fugiat duis est qui. Est adipisicing ipsum qui cupidatat exercitation. Cupidatat aliqua deserunt id deserunt excepteur nostrud culpa eu voluptate excepteur. Cillum officia proident anim aliquip. Dolore veniam qui reprehenderit voluptate non id anim.\r\n",
    title:
      "Deserunt laborum id consectetur pariatur veniam occaecat occaecat tempor voluptate pariatur nulla reprehenderit ipsum.",
  },
];

//1
(function (arrOfTasks) {
  //переделанно в obj in obj для удобства работы
  const objOfTask = arrOfTasks.reduce((acc, task) => {
    acc[task._id] = task;
    return acc;
  }, {});
  // elements UI
  //5
  const listContainer = document.querySelector(
    ".tasks-list-section .list-group"
  );
  // получаем инпуты специальными методами
  //7
  const form = document.forms["addTask"];
  const inputTitle = form.elements["title"];
  const inputBody = form.elements["body"];

  renderAllTasks(objOfTask);
  //9 вещаем собитие
  form.addEventListener("submit", onFormSubmitHandler);

  //16 вещаем событие на родитеоя делегирование из за того что нет прямого доступа
  listContainer.addEventListener("click", onDeleteHandler);

  //на вход получает obj и проверяет что передан.Дальше создаем fragment что бы не добавлять по одной списки
  //2
  function renderAllTasks(tasksList) {
    if (!tasksList) {
      console.error("Передайте список задач!");
      return;
    }
    //4
    const fragment = document.createDocumentFragment();
    //перебор task
    Object.values(tasksList).forEach((task) => {
      const li = listItemTemplate(task);
      fragment.appendChild(li);
    });
    //6
    listContainer.appendChild(fragment);
  }

  //создание элементов
  //3
  function listItemTemplate({ _id, title, body } = {}) {
    const li = document.createElement("li");
    li.classList.add(
      "list-group-item",
      "d-flex",
      "align-items-center",
      "flex-wrap",
      "mt-2"
    );
    //18 добавляем  атрб
    li.setAttribute("data-task-id", _id);

    //для текста внутри li
    const span = document.createElement("span");
    span.textContent = title;
    span.style.fontWeight = "bold";
    // кнопка
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete task";
    deleteBtn.classList.add("btn", "btn-danger", "ml-auto", "delete-btn");

    // для параграфа
    const article = document.createElement("p");
    article.textContent = body;
    article.classList.add("mt-2", "w-100");

    li.appendChild(span);
    li.appendChild(deleteBtn);
    li.appendChild(article);

    return li;
  }

  // Функция для инпутов
  //8
  function onFormSubmitHandler(e) {
    e.preventDefault();
    //10 достаем значение
    const titleValue = inputTitle.value;
    const bodyValue = inputBody.value;

    //проверка
    if (!titleValue || !bodyValue) {
      alert("Пожалуйста введите title и body");
      return;
    }
    //12 // злесь получаем копию задачи
    const task = createNewTasks(titleValue, bodyValue);

    //14
    const listItem = listItemTemplate(task);
    //15 добавляем в самое начало списка и очищаем инпут
    listContainer.insertAdjacentElement("afterbegin", listItem);
    form.reset();
  }

  //функция создает один obj задачи
  //11
  function createNewTasks(title, body) {
    const newTasks = {
      title,
      body,
      completed: false,
      //генерация рандом id
      _id: `tasks-${Math.random()}`,
    };
    //13 добавляем новую задачу всем таскам  и возвращаем копию задачи
    objOfTask[newTasks._id] = newTasks;
    return { ...newTasks };
  }

  //19
  function deleteTask(id) {
    const { title } = objOfTask[id];
    const isConfirm = confirm(`Точно хотите удалить?: ${title}`);
    if (!isConfirm) return isConfirm;
    delete objOfTask[id];
    return isConfirm;
  }

  //20
  function deleteTaskfromHtml(confirmed, el) {
    if (!confirmed) return;
    el.remove();
  }


  //17
  function onDeleteHandler({ target }) {
    //определяем на кого произашел клик
    if (target.classList.contains("delete-btn")) {
      //находим родителя по атрб 
      const parent = target.closest("[data-task-id]");
      //забираем id 
      const id = parent.dataset.taskId;
      // передаем в функ
      const confirmed = deleteTask(id);
      //передаем в функ 
      deleteTaskfromHtml(confirmed, parent);
    }
  }
})(tasks);
