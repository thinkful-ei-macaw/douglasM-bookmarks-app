/* eslint-disable no-undef */
import store from './store.js';
import api from './api.js';


/*****Generate Functions*****/

const generateStart = function() {

  return `
    <form id="js-new-bookmark">
    <button class="new-bookmark js-new-bookmark">New Bookmark</button>
    <label for="js-filter">Filter By:</label>
    <select name="selector" id="js-filter">
      <option value="" disabled selected hidden>Filter By:</option>
      <option value="5">5 Star</option>
      <option value="4">4 Star</option>
      <option value="3">3 Star</option>
      <option value="2">2 Star</option>
      <option value="1">1 Star</option>
    </select>
  </form>
  `;
};



const generateBookmarkElement = function (item) {
  if (item.expanded) {
    return `
    <li class="js-bookmark-item-expanded" data-item-id="${item.id}">
    <span class="title">${item.title}</span>
    <span class="rating">${item.rating} Star</span>
    <p class="bookmark-description">${item.desc}</p>
    <button onclick="window.location.href = '${item.url}';">Visit Site</button>
    <button class="delete js-delete" id="js-delete">
      <span class="button-label">Delete</span>
    </button>
  `;
  }
  return `
      <li class="js-bookmark-item" data-item-id="${item.id}">
        <span class="title">${item.title}</span>
        <span class="rating">${item.rating} Star</span>
      </li>
      `;
};

const generateNewBookmarkForm = function() {
  return `
  <form id="bookmarkForm" name="bookmarkForm">
        <label for="title">Title:</label>
        <br>
        <input type="text" name="title" id="title" class="js-title-entry" placeholder="bookmark name" required />
        <br>
        <label for="url">Add a new bookmark:</label>
        <br>
        <input type="url" name="url" id="url" class="js-url-entry" placeholder="e.g., https://www.google.com/" required />
        <br>
        <label for="rating">Rating:</label>
        <br>
        <input type="number" name="rating" id="rating" class="js-rating-entry" placeholder="e.g., 3" min="1" max="5" required />
        <br>
        <label for="desc">Description: (Optional)</label>
        <br>
        <textarea name="desc" id="desc" rows="10" cols="30"></textarea>
        <br>
        <button type="submit" class="js-create">Create</button>
      </form>
      <form id="cancel">
      <button class="js-cancel">Cancel</button>
      </form>
  `;
};

const generateBookmarkItemsString = function (bookmarkList) {
  const items = bookmarkList.map((item) => generateBookmarkElement(item));
  return items.join('');
};

const generateError = function(error){
  if (error.message) {
    return `
    <p>${error.message}</p>
    `;
  } else {
    return '';
  }
};

/*****Misc. Functions*****/

const resetError = function() {
  store.error.message = null;
  store.error.code = null;
};

const getBookmarkIdFromElement = function (item) {
  return $(item)
    .closest('.js-bookmark-item')
    .data('item-id');
};

const getBookmarkIdFromExpanded = function (item) {
  return $(item)
    .closest('.js-bookmark-item-expanded')
    .data('item-id');
};

/******Render Functions*****/

const render = function () {
  let items = [...store.bookmarks].filter((item) => item.rating >= store.filter);
  if (store.adding === true) {
    const generateForm = generateNewBookmarkForm();
    $('.js-bookmark').html(generateForm);
    store.adding = !store.adding;
  } else {
    const errorString = generateError(store.error);
    const bookmarkItemsString = generateBookmarkItemsString(items);
    const start = generateStart();
    $('.js-bookmark').html(start + errorString);
    $('.js-bookmark-list').html(bookmarkItemsString);
    resetError();
  }
};





/*****Handle Functions*****/

const handleNewBookmarkClicked = function() {
  $('.js-bookmark').on('submit', '#js-new-bookmark', function (event) {
    event.preventDefault();
    render();
    store.adding = !store.adding;
    render();
  });
};

const handleNewBookmarkSubmit = function () {
  $('.js-bookmark').on('submit', '#bookmarkForm', function(event) {
    event.preventDefault();
    const obj = {
      title: $('#title').val(),
      url: $('#url').val(),
      rating: $('#rating').val(),
      desc: $('#desc').val()
    };
    api.createBookmark(obj)
      .then(res => {
        if (!res.ok){
          store.error.code = res.status;
        }
        return res.json();
      })
      .then((newBookmark) => {
        if (store.error.code) {
          store.error.message = newBookmark.message;
          return Promise.reject(store.error);
        } else {
          store.addBookmark(newBookmark);
          render();
        }
      })
      .catch(err => {
        store.error.message = err.message;
        render();
      });
  });
};

const handleNewBookmarkCancel = function () {
  $('.js-bookmark').on('submit', '#cancel', function(event) {
    event.preventDefault();
    render();
  });
};

const handleListItemSelected = function () {
  $('.js-bookmark-list').on('click', '.js-bookmark-item', function(event) {
    event.preventDefault();
    const id = getBookmarkIdFromElement(event.currentTarget);
    store.toggleExpanded(id);
    render();
    store.toggleExpanded(id);
  });
};


// this function will collapse the expanded bookmark when you click outside
// of the bookmarks field.

const handleFilterChange = function () {
  $('.js-bookmark').on('change', '#js-filter', function(event) {
    event.preventDefault();
    const rating = parseInt($('#js-filter').val());
    store.filter = rating;
    render();
  });
};

const handleDeleteClicked = function() {
  $('.js-bookmark-list').on('click', '#js-delete', function(event) {
    event.preventDefault();
    const id = getBookmarkIdFromExpanded(event.currentTarget);
    api.deleteBookmark(id)
      .then((res)=> {
        if (!res.ok){
          store.error.code = res.status;
          return res.json();
        } else {
          store.findAndDelete(id);
          render();
        }
      })
      .then(data => {
        if (store.error.code){
          store.error.message = data.message;
          return Promise.reject(store.error);
        }})
      .catch(err => {
        store.error.message = err.message;
        render();
      });
  });
};

const bindEventListeners = function () {
  handleNewBookmarkClicked();
  handleNewBookmarkSubmit();
  handleNewBookmarkCancel();
  handleListItemSelected();
  handleFilterChange();
  handleDeleteClicked();
};

export default {
  render,
  bindEventListeners
};