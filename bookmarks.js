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

const render = function() {
  $('.bookmarks-list-results').html('');

  api.getAllBookmarks()
    .then(res => res.json())
    .then(data => {
      data.forEach(item => {
        $('.bookmarks-list-results').append(`
        <li>
        Title <span class="title-span"> ${item.title} </span>
        Rating <span class="rating-span">${item.rating}</span>

        <button type="submit">Delete Bookmark?</button>

        <div class="expandContent">
            <form action="${item.url}">
                <label for="visitSite" class="hidden"></label>
                <input type="submit" value="Visit Site" id="visitSite"/>
            </form>
            <p>
                ${item.desc}
            </p>

        </div>
    </li>
    `);

      });
    });

  console.log(`render is working`);
};

/**
 * Handler for new bookmark clicked
 */
const handleNewBookmarkSubmit= function() {
  $('.bookmarkControls').submit( function () {
    event.preventDefault();
    
    $('.displayBookmarkForm').html(`
        <form id="bookmark-list-form">
                
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

    <label for="addBookmarkDescription">Description</label>
    <textarea class="addBookmarkDescription name = "description" >
        Description (optional)
    </textarea>
    
    <div >
        <button type="submit class="bookmark-btn-create">Create</button>
        <button type="button class="bookmark-btn-cancel" >Cancel</button>
    </div>

</fieldset>
</form>
        `);
  });
  console.log('handel new book mark is working;');
};

/**
 * Handler for add bookmark clicked
 */
const handleAddBookmarkClicked = function() {
  console.log('add bookmark is working');
}

/**
 * Handler for cancel button
 */
const handleCancelBtn = function() {
  console.log('cancel button is working');
  $('.bookmark-btn-cancel').on('click', () => {
    store.toggleAdding();
    render();
  });
};


/**
 * Handler for delete button
 */

const handleDeleteBookmarkClicked = function() {
  console.log('delete bookmark is working');
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
  handleNewBookmarkSubmit(),
  handleAddBookmarkClicked(),
  handleCancelBtn(),
  handleDeleteBookmarkClicked(),
  handleToggleExpandedBookmarkView(),
  handleFilterRatingsDropdown()
};


export default {
  bindEventListeners,
  render
};