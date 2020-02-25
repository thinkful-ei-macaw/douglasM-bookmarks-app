const bookmarks=[];
const adding = true;
let error = {
  code: null,
  message: null
};
let filter = 0;
let expanded = false;
const findById = function (id) {
  return this.bookmarks.find(currentItem => currentItem.id === id);
};

const addBookmark = function (item) {
  this.bookmarks.push(item);
};

const findAndDelete = function (id) {
  this.bookmarks = this.bookmarks.filter(currentItem => currentItem.id !== id);
};

export default {
  bookmarks,
  adding,
  error,
  filter,
  findById,
  addBookmark,
  findAndDelete,
  expanded
};