export default class ToDoItem {
  constructor() {
    /* Constructor to initialize the properties */
    this._id = null;
    this._item = null;
  }

  getId() {
    return this._id; // Return the id of the task
  }

  setId(id) {
    this._id = id; // Set the id of the task
  }

  getItem() {
    return this._item; // Return the task
  }

  setItem(item) {
    this._item = item; // Set the task
  }
}
