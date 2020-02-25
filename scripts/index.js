/* eslint-disable no-undef */
import store from './store.js';
import api from './api.js';
import bookmarks from './bookmarks.js';


const main = function () {
  api.getBookmarks()
    .then(res => res.json())
    .then((items) => {
      items.forEach((item) => store.addBookmark(item));
      bookmarks.render();
    });

  bookmarks.bindEventListeners();
};

$(main);