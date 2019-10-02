/* eslint-disable no-unreachable */
/* eslint-disable no-console */
import api from './api.js';
import store from './store.js';



const generateBookmarksElement = function(bookmark) {
  let bookmarkExpandView = ``;
  let bookmarkTitle = `<span class="rating-span"> ${bookmark.rating} </span>`;;

if(store.rating >= store.filter){

    if(bookmark.expanded) {
      bookmarkTitle =  `<button class="delete-btn">
        <span class="delete-btn-label"> Delete </span>
      </button>`;
      bookmarkExpandView = `
        <div class = "expandContent">
          <button class="visit-btn">
          <span class="visit-btn-label"> Visit Site </span>
          </button>

          <span class="rating-span"> ${bookmark.rating} </span>
          <p> ${bookmark.desc} </p>
        </div>
      `;
    }

    return `
    <li class = "bookmark-element" data-bookmark-id="${bookmark.id}">
      <span class="bookmark-item-title"> ${bookmark.title} ${bookmarkTitle} </span>
      ${bookmarkExpandView};
      </li>`;
} else {
  return `
    <li class = "bookmark-element" data-bookmark-id="${bookmark.id}">
   <span class="bookmark-item-title"> ${bookmark.title} ${bookmarkTitle} </span>
    ${bookmarkExpandView};
    </li>`;
}
  
};

const generateBookmarksString = function (mybookmark) {
   const items = mybookmark.map((item) => generateBookmarksElement(item));
   return items.join('');
};


const render = function() {

  let form = ``;
  store.myData.filter = 0;

 console.log(store.myData.adding);
  let items = [...store.myData.bookmarks];

  if(store.myData.adding) {
         form = `
    <fieldset class="bookmarkDetails">
        <Legend>Create a Bookmark</Legend>
        <div>
                <label for="bookmark-title-input">Title :</label>
                <input type = "text" class="bookmark-title-input" name="bookmark-title-input" placeholder="Enter  title here"/>
        </div>
        <div>
                <label for=""bookmark-url">URL :</label>
                <input type = "url" class="bookmark-url" name="bookmark-url" placeholder="https://www.google.com/" />
        </div>

        <div>
            <label for= "filterByRating">Rating(s):</label>
            <select class= "filterByRating" name="filterByRating">
                <option selected disabled>Select Ratings</option>
                <option value=5>5 stars</option>
                <option value=4>4 stars</option> 
                <option value=3>3 stars</option> 
                <option value=2>2 stars</option> 
                <option value=1>1 star</option> 
            </select>       
        </div> 

        <div>
            <label for="addBookmarkDescription">Description</label>
            <textarea class="addBookmarkDescription name = "addBookmarkDescription" > Description (optional)</textarea>
        </div>
        
        <button type="submit" class="btn bookmark-btn-create">Create</button>
        <button type="button" class="btn bookmark-btn-cancel" >Cancel</button>
    </fieldset>
  `}

  $('.displayBookmarkForm').html(form);
    if(store.myData.adding) {
      handleCancelBtn();
    }
  //rendering in the DOM 
  const bookmarkListItemString = generateBookmarksString(items);

  //Insert into the DOM
  $('.bookmarks-list-results').html(bookmarkListItemString);
 
};



const handleNewBookmarkSubmit= function() {
  $('.btn-new-bookmark').on('click', function () {
    store.toggleAddingBookmark();
    render();
 });
};

const handleCancelBtn = function() {
  $('.bookmark-btn-cancel').on('click', function () {
    store.toggleAddingBookmark();
    render();
  });
};

const getElementID = function(item) {
  return $(item)
      .closest('.bookmark-element')
      .data('bookmark-id');
};

const handleBookmarkClicked = function () {
  $('.bookmarks-list-results').on('click','.bookmark-item-title', event => {
    const id = getElementID(event.currentTarget);
    console.log(id);
    const item = store.findById(id);
    console.log(item);
    store.findAndUpdate(id, {expanded: !item.expanded});
    render();
  });
};

const handleBookmarkAdd = function() {
  $('.displayBookmarkForm').submit(function(event){
    event.preventDefault();

    const newTitle = $('.bookmark-title-input').val();
    const newUrl = $('.bookmark-url').val();
    const newRating = $('.addBookmarkRating').val();
    const newDesc = $('.addBookmarkDescription').val();

    $('.bookmark-title-input').val('');
    $('.bookmark-url').val('');
    $('.addBookmarkDescription').val();

    const newBookmark = { title: newTitle, url: newUrl, rating: newRating, desc: newDesc};

    api.createBookmarks(newBookmark)
      .then( newItem => {
         store.addItem(newItem);
         store.toggleAddingBookmark();
        render();
      })
     .catch(error => {
       store.setError(error.message);
     });
  });
};


const handleDeleteBookmarkClicked = function() {
  $('.bookmarks-list-results').on('click', '.delete-btn', () => {
    const id = getElementID(event.currentTarget);
    console.log(`delete bookmark is working ${id}`);
    api.deleteBookmarks(id)
    .then(() => {
      store.findAndDelete(id);
      render();
    })
    .catch((error) => store.setError(error.message));
  });
  
};


/**
 * Handler for filter selection
 */

 const filterBookmarkList = function () {
  const filterRatingsVal = store.myData.filter;
  const filteredItems = store.myData.bookmarks.filter(item => item.rating >= filterRatingsVal);
  //$('.bookmarks-list-results').html('');
  filteredItems.forEach(item => generateBookmarksElement(item));
 };

const handleFilterRatingsDropdown = function() {
  $('.filterByRating').change( function() {
    const filterValue = $(this).val();
    store.myData.filter = filterValue;
    console.log(` store filter ${store.myData.filter }`);
    //filterBookmarkList();
    render();
  });
};


/**
 * Event Listener Handlers
 */
const bindEventListeners = function() {
  handleBookmarkClicked();
  handleNewBookmarkSubmit();
  handleBookmarkAdd();
  handleCancelBtn();
  handleDeleteBookmarkClicked();
  handleFilterRatingsDropdown();
};

export default {
  bindEventListeners,
  render
};

