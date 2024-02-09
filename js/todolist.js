export default class ToDoList {
  constructor() {
    this._list = []; // Array to store the list of tasks
  }

  getList() {
    return this._list; // Return the list of tasks
  }

  clearList() {
    this._list = []; /* Clear the list of tasks */
  }

  addItemToList(itemObj) {
    this._list.push(itemObj); // Add the task to the list
  }

  removeItemFromList(id) {
    const list = this._list;

    for (let i = 0; i < list.length; i++) {
      if (list[i]._id == id) {
        /* == : since id is a string when extracted from DOM */
        list.splice(i, 1); //Remove the task from the list
        break;
      }
    }
  }
}
