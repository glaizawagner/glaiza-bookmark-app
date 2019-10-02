import api from './api.js';
import store from './store.js';



/**
 * Will render the page by calling to the api server to get the list of bookmarks 
 * and render the page with the list of bookmarks
 */
// const generateBookmarkElement = function(bookmark) {

// };

// const generateBookmarkString = function(itemList) {
//   const items = itemList.map(item => generateBookmarkElement(item));
//   return items.join();
// };
const generateBookmarkList = function() {
  console.log('generate bookmark list');
};

const render = function() {

  let html = '';

  if(store.adding === true) {
    html = generateBookmarkList(store.bookmarks);
  } else if (store.adding === false) {
    $('.displayBookmarkForm').html(html);
  }
  
};

/* Handle Add New Bookmark */
const addNewBookMark = function () {
  return `
  <form id="addNewbookmarkform">
    <fieldset class="bookmarkDetails">
        <Legend>Create a Bookmark</Legend>
        <div>
                <label for="bookmark-title-input">Title :</label>
                <input type = "text" class="bookmark-title-input" name="bookmark-title-input" placeholder="Enter  title here" required>
        </div>
        <div>
                <label for=""bookmark-url">URL :</label>
                <input type = "url" class="bookmark-url" name="bookmark-url" placeholder="https://www.google.com/" required>
        </div>

        <div>
            <label for= "addBookmarkRating">Rating(s):</label>
            <select id= "addBookmarkRating" name="rating" required>
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
            <textarea class="addBookmarkDescription name = "description" > Description (optional)</textarea>
        </div>
        
        <button type="submit" class="bookmark-btn-create">Create</button>
        <button type="button" class="bookmark-btn-cancel" >Cancel</button>
    </fieldset>
</form>`;
console.log('Add new is working;');
};
/**
 * Handler for new bookmark clicked
 */
const handleNewBookmarkSubmit= function() {
  $('#bookmarkControls').submit( function () {
    event.preventDefault();
    
    $('.displayBookmarkForm').html(`
    <form id="addNewbookmarkform">
    <fieldset class="bookmarkDetails">
        <Legend>Create a Bookmark</Legend>
        <div>
                <label for="bookmark-title-input">Title :</label>
                <input type = "text" class="bookmark-title-input" name="bookmark-title-input" placeholder="Enter  title here" required>
        </div>
        <div>
                <label for=""bookmark-url">URL :</label>
                <input type = "url" class="bookmark-url" name="bookmark-url" placeholder="https://www.google.com/" required>
        </div>

        <div>
            <label for= "addBookmarkRating">Rating(s):</label>
            <select id= "addBookmarkRating" name="rating" required>
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
            <textarea class="addBookmarkDescription name = "description" > Description (optional)</textarea>
        </div>
        
        <button type="submit class="bookmark-btn-create">Create</button>
        <button type="button class="bookmark-btn-cancel" >Cancel</button>
    </fieldset>
</form>
        `);
  });
  console.log('handel new book mark is working;');
};


/**
 * Handler for cancel button
 */
const handleCancelBtn = function() {
  
  // $('.displayBookmarkForm').on('reset', '#addNewbookmarkform', function() {
  //   $('.displayBookmarkForm').html('');
  //   console.log('cancel button is working');
  //   render();
  // });

  $('.bookmark-btn-cancel').on('click', function() {
    store.toggleAdding();
    render();
    console.log('cancel button is working');
  });

};


/**
 * Handler for delete button
 */

const handleDeleteBookmarkClicked = function() {
  console.log('delete bookmark is working');
};

const handleCreateBookmarkSubmit = function () {

};
/**
 * Serialize Json
 */

function serializeJson(form){
  const formData = new FormData(form);
  const obj = {};
  formData.forEach((val, name) => obj[name] = val);
  return JSON.stringify(obj);
}
/**
 * Handler for condensing/expanding bookmar
 */
const handleToggleExpandedBookmarkView = function() {
  $('li').click(function() {
    console.log('li is working');
    if ($(this).find('.hidden').hasClass('expanded')) {
      $(this).find('.hidden').removeClass('expanded');
    } else {
      $(this).find('.hidden').addClass('expanded');
    }
  });
};

/**
 * Handler for filter selection
 */

const handleFilterRatingsDropdown = function() {
  console.log('filter ratings is working');
};

/**
 * Event Listener Handlers
 */
const bindEventListeners = function() {
  addNewBookMark();
  handleNewBookmarkSubmit();
  handleCancelBtn();
  handleDeleteBookmarkClicked();
  handleToggleExpandedBookmarkView();
  handleFilterRatingsDropdown();
  handleCreateBookmarkSubmit();
};


export default {
  bindEventListeners,
  render
};