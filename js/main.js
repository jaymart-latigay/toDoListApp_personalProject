import ToDoList from "./todolist.js";
import ToDoItem from "./todoitem.js";

const toDoList = new ToDoList(); // Create a new instance of the ToDoList class

// Launch app
// Listen for the readystatechange event. readystatechange event is fired when the readyState attribute of a document has changed.
document.addEventListener("readystatechange", (event) => {
  // Check if the app is fully loaded
  if (event.target.readyState === "complete") {
    initApp(); // initApp is for initializing the app
  }
});

const initApp = () => {
  //Add listeners
  const itemEntryForm = document.getElementById("itemEntryForm");
  itemEntryForm.addEventListener("submit", (event) => {
    event.preventDefault(); //prevent the default: reloads the page every time the form is submitted
    processSubmission();
  });

  const clearItems = document.getElementById("clearItems");
  clearItems.addEventListener("click", (event) => {
    const list = toDoList.getList();
    if (list.length) {
      //if length of list is not 0
      const confirmed = confirm("Are you sure you want to clear the list?");
      if (confirmed) {
        toDoList.clearList(); // Clear the list of tasks
        updatePersistentData(toDoList.getList());
        refreshThePage();
      }
    }
  });

  //Procedural (things that need to be done when the app is loaded)
  // 1. Load the list object from web storage when app is initally loaded
  loadListObject();

  // 2. Refresh the page
  refreshThePage();
};

const loadListObject = () => {
  const storedList = localStorage.getItem("myToDOList"); // Get the list from web storage
  if (typeof storedList != string) return; //if storedList is not a string, return
  const parsedList = JSON.parse(storedList); // Convert the list from string to object
  parsedList.forEach((itemObj) => {
    // Create a new instance of the ToDoItem class
    //use the id and item properties since getters and setters since they don't exist in the class yet
    const newToDoItem = createNewItem(itemObj._id, itemObj._item);
    toDoList.addItemToList(newToDoItem); // Add the task to the list
  });
};

const refreshThePage = () => {
  clearListDisplay();
  renderList();
  clearItemEntryField();
  setFocusOnItemEntryField(); // Set focus on the item entry field means user can start typing right away when app loads without having to click on the input field*/
};

const clearListDisplay = () => {
  const parentElement = document.getElementById("listItems"); //get the task list by id. listItems is the class of container of task lists in index file
  deleteContents(parentElement); //delete the contents of the task list
};

const deleteContents = (parentElement) => {
  let child = parentElement.lastElementChild; //get the last child of the task list
  while (child) {
    //if there is a child
    parentElement.removeChild(child); //built in: removes child
    child = parentElement.lastElementChild; //set child to next remaining child in the task list
  }
};

const renderList = () => {
  const list = toDoList.getList(); // Get the list of tasks
  list.forEach((item) => {
    buildListItem(item);
  });
};

const buildListItem = (item) => {
  //creates a new div element for newly added tasks
  const div = document.createElement("div"); // Create a div element
  div.className = "item";
  const check = document.createElement("input"); // Create an input element
  check.type = "checkbox"; // Set the input type to checkbox
  check.id = item.getId(); //gets the id from ToDoItem class
  check.tabIndex = 0;
  addClickListnerToCheckbox(check);
  const label = document.createElement("label"); // Create a label element
  label.htmlFor = item.getId(); //since we want the label to be associated with the id of checkbox
  label.textContent = item.getItem(); // Set the text content of the label to the task

  //store check and label in div container
  div.appendChild(check);
  div.appendChild(label);

  const container = document.getElementById("listItems"); // Get the listItems container
  container.appendChild(div); //store the div in the listItems container
};

const addClickListnerToCheckbox = (checkbox) => {
  //add click event listener to the checkbox (for when user clicks "clear" button to remove all tasks)
  checkbox.addEventListener("click", (event) => {
    toDoList.removeItemFromList(checkbox.id); // Remove the task from the list
    updatePersistentData(toDoList.getList());
    setTimeout(() => {
      //refresh the page after 1 second
      refreshThePage();
    }, 1000);
  });
};

const updatePersistentData = (listArray) => {
  //localStorage is a built-in object that stores data with no expiration date. The data will not be deleted when the browser is closed, and will be available the next day, week, or year. (It only store strings, hence JSON.stringify is used to convert the listArray to string)
  //store the listArray in local storage. JSON.stringify converts a JavaScript object or value to a JSON string. "myToDoList" is the name of the key
  localStorage.setItem("myToDoList", JSON.stringify(listArray));
};

const clearItemEntryField = () => {
  document.getElementById("newItem").value = ""; // Clear the item entry field
};

const setFocusOnItemEntryField = () => {
  document.getElementById("newItem").focus(); // Set focus on the item entry field
};

const processSubmission = () => {
  const newEntryText = getNewEntry(); // Get the new entry text
  if (!newEntryText.length) return; //if the new entry text is empty (no char), return
  const nextItemId = calcNextItemId(); // Calculate the next item id
  const toDoItem = createNewItem(nextItemId, newEntryText); // Create a new item
  toDoList.addItemToList(toDoItem); // Add the new item to the list
  updatePersistentData(toDoList.getList());
  refreshThePage();
};

const getNewEntry = () => {
  return document.getElementById("newItem").value.trim(); // Get the new entry text. trim() removes whitespace from both ends of a string
};

const calcNextItemId = () => {
  let nextItemId = 1; // Set the next item id to 1 (in case no items are in the list)
  const list = toDoList.getList(); // Get the list of tasks
  if (list.length > 0) {
    nextItemId = list[list.length - 1].getId + 1; // Set the next item id to the last item id + 1
  }
  return nextItemId;
};

const createNewItem = (itemId, itemText) => {
  const toDo = new ToDoItem(); // Create a new instance of the ToDoItem class
  toDo.setId(itemId); // Set the id of the task
  toDo.setItem(itemText); // Set the task
  return toDo;
};
