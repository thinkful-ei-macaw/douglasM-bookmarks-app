const BASE_URL = 'https://thinkful-list-api.herokuapp.com/douglasminer';

const getBookmarks = function() {
  return fetch(BASE_URL + '/bookmarks');
};

const createBookmark = function(name, url) {
  return fetch(`${BASE_URL}/bookmarks`, {method:'POST',headers: {'Content-Type': 'application/json'}, body: JSON.stringify({name,url})});
};

const deleteBookmark = function(id) {
  return fetch(`${BASE_URL}/bookmarks/${id}`, {method: 'DELETE'});
};

export default {
  getBookmarks,
  createBookmark,
  deleteBookmark
};