const bookmarks=[];
const adding = false;
let error = {
  code: null,
  message: null
};
let filter = 1;

const findById = function (id) {
  return this.bookmarks.find(currentItem => currentItem.id === id);
};

const addBookmark = function (item) {
  item.expanded = false;
  this.bookmarks.push(item);
};

const findAndDelete = function (id) {
  this.bookmarks = this.bookmarks.filter(currentItem => currentItem.id !== id);
};

const findAndUpdate = function (id, newData){
  const item = this.findById(id);
  Object.assign(item, newData);
};

const toggleExpanded = function (id) {
  const item = this.findById(id);
  item.expanded = !item.expanded;
};

export default {
  bookmarks,
  adding,
  error,
  filter,
  findById,
  addBookmark,
  findAndDelete,
  findAndUpdate,
  toggleExpanded
};