/* eslint-disable no-console */
import api from './api.js';
import store from './store.js';




const createStoreBookmarkListForStore = function(item) {
  $('.bookmarks-list-results').append(`
  <li id=${item.id}>
  <div class="title-rating">
  Title <span class="title-span"> ${item.title} </span>
  Rating <span class="rating-span"> ${item.rating}</span>
  </div>
  <form class="delete-btn">
      <button type="submit">Delete Bookmark?</button>
  </form>
  
  <div class="expandContent hidden">
      <form action="${item.url}" target="_blank">
          <label for="visitSite" class="hidden"></label>
          <input type="submit" value="Visit Site" id="visitSite"/>
      </form>
      <p>
        ${item.desc}
      </p>

      </div>
</li>
`
  );

  console.log('generate bookmark list');
};


const initializeBookmarkListforStore = function(data) {
  Object.assign(store.myData.bookmarks, data);
};

const render = function() {

  store.myData.filter = 0;

  $('.bookmarks-list-results').html('');

  api.getAllBookmarks()
    .then( data => {
      data.forEach(item => createStoreBookmarkListForStore(item));
      initializeBookmarkListforStore(data);
      console.log(`render is working ${data}`);
    })
    .catch(error => {
      console.log(`Error message in render ${error}`);
    });
  //console.log(`render is working`);
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
                <input type = "text" class="bookmark-title-input" name="bookmark-title-input" placeholder="Enter  title here"/>
        </div>
        <div>
                <label for=""bookmark-url">URL :</label>
                <input type = "url" class="bookmark-url" name="bookmark-url" placeholder="https://www.google.com/" />
        </div>

        <div>
            <label for= "addBookmarkRating">Rating(s):</label>
            <select class= "addBookmarkRating" name="addBookmarkRating" required>
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
        
        <button type="submit class="btn bookmark-btn-create">Create</button>
        <button type="button class="btn bookmark-btn-cancel" >Cancel</button>
    </fieldset>
</form>
        `);
    console.log('handel new bookmark is working;');
  });
  
};

/**
 * Serialize Json
 */

// function serializeJson(form){
//   const formData = new FormData(form);
//   const obj = {};
//   formData.forEach((val, name) => obj[name] = val);
//   return JSON.stringify(obj);
// }

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

    const newBookmark = {newTitle, newUrl, newRating, newDesc};

    //let formElement = ('.bookmark-btn-create')[0];
    console.log(newBookmark);

    api.createBookmarks(newBookmark)
      .then(res => res.json())
      .then( newItem => {
        store.myData.addItem(newItem);
        store.myData.toggleAddingBookmark();
        render();
      });
    //.catch(error => console.log(error.messase));
  });
 
//   let formElement = $('.bookmark-btn-create')[0];
//   api.createBookmarks(serializeJson(formElement))
//     .then(res => res.json())
//     .then(item => {
//       console.log(item);
//       store.addItem(item);
//       store.toggleAddingBookmark();
//       render();
//     })
//     .catch(err => console.log(err.message));
// });

};

/**
 * Handler for cancel button
 */
const handleCancelBtn = function() {
  // $('main').on('click', '.bookmark-btn-cancel', function () {
  //   event.preventDefault();
  //   console.log('cancel button is working');
  //   store.toggleAddingBookmark(false);
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
 * Handler for condensing/expanding bookmar
 */
const handleToggleExpandedBookmarkView = function() {
  // $('li').click(function() {
  console.log('li is working');
  //   if ($(this).find('.hidden').hasClass('expanded')) {
  //     $(this).find('.hidden').removeClass('expanded');
  //   } else {
  //     $(this).find('.hidden').addClass('expanded');
  //   }
  // });
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
  handleBookmarkAdd();
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