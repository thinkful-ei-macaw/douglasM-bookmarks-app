/* eslint-disable no-undef */
import store from './store.js';
import api from './api.js';


/*****Generate Functions*****/

const generateStart = function() {
  // !store.adding
};

const generateBookmarkElement = function (bookmark) {
  
  return `
      <li class="js-bookmark-item" data-item-id="1">
        <span class="name">${bookmark.name}</span>
        <span class="rating">${bookmark.rating} Star</span>
      </li>
  `;
};

const generateNewBookmarkForm = function() {
  return `
  <form id="bookmarkForm" name="bookmarkForm">
        <label for="url">Add a new bookmark:</label>
        <br>
        <input type="url" name="url" id="url" class="js-url-entry" placeholder="e.g., https://www.google.com/">
        <br>
        <label for="title">Title:</label>
        <br>
        <input type="text" name="title" id="url" class="js-title-entry" placeholder="bookmark name">
        <br>
        <label for="rating">Rating:</label>
        <br>
        <input type="number" name="rating" id="rating" class="js-rating-entry" placeholder="e.g., 3" min="1" max="5">
        <br>
        <label for="description">Description: (Optional)</label>
        <br>
        <textarea name="description" id="description" rows="10" cols="30"></textarea>
        <br>
        <button class="js-cancel">Cancel</button>
        <button type="submit" class="js-create">Create</button>
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


const resetError = function() {
  store.error.message = null;
  store.error.code = null;
};

const render = function () {
  // Filter item list if store prop is true by item.checked === false
  let items = [...store.bookmarks];
  
  const errorString = generateError(store.error);
  // render the shopping list in the DOM
  const bookmarkItemsString = generateBookmarkItemsString(items);
  // insert that HTML into the DOM
  $('.js-bookmark-list').html(errorString + bookmarkItemsString);
  resetError();
};





/*****Handle Functions*****/

const handleNewBookmarkClicked = function() {
  $('#js-new-bookmark').submit(function (event) {
    event.preventDefault();
    const generateForm = generateNewBookmarkForm();
    $('.js-container').html(generateForm);
  });
};

const handleNewBookmarkSubmit = function () {
  $('.js-container').on('submit', '#bookmarkForm', function(event) {
    event.preventDefault();
    let formData = new FormData(bookmarkForm);
    console.log(formData);

  });
};

const handleNewBookmarkCancel = function () {
  $('.js-container').on('click', '#bookmarkForm', function(event) {
    event.preventDefault();
    render();
  })
};

const bindEventListeners = function () {
  handleNewBookmarkClicked();
  handleNewBookmarkSubmit();
  handleNewBookmarkCancel();
  // handleItemCheckClicked();
  // handleDeleteItemClicked();
  // handleToggleFilterClick();
};

export default {
  render,
  bindEventListeners
};