import api from './api.js';
import store from './store.js';




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
                <input type = "text" id="bookmark-title-input" name="bookmark-title-input" placeholder="Enter  title here" required>
        </div>
        <div>
                <label for=""bookmark-url">URL :</label>
                <input type = "url" id="bookmark-url" name="bookmark-url" placeholder="https://www.google.com/" required>
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
        
        <button type="submit class="btn bookmark-btn-create">Create</button>
        <button type="button class="btn bookmark-btn-cancel" >Cancel</button>
    </fieldset>
</form>
        `);
  });
  console.log('handel new bookmark is working;');
};


/**
 * Handler for cancel button
 */
const handleCancelBtn = function() {
  console.log('cancel button is working');
  // $('.displayBookmarkForm').on('reset', '#addNewbookmarkform', function() {
  //   $('.displayBookmarkForm').html('');
  //   console.log('cancel button is working');
  //   render();
  // });

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