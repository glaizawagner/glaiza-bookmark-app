/* eslint-disable no-unreachable */
import api from './api.js';
import store from './store.js';


const generateBookmarksElement = function(item) {

  let bookmarkExpandView = ``;

  let bookmarkTitle = `<span class="rating-span"> ${item.rating} <i class="far fa-star"></i> </span>`;

  if(item.expanded) {
    bookmarkTitle =  `<button class="delete-btn">
        <span class="delete-btn-label"> <i class="far fa-trash-alt"></i> </span>
      </button>
      `;

    bookmarkExpandView = `
        <div class = "expandContent">
         <span class="expanded-items">
         <button class="visit-btn"> 
         <span class="visit-btn-label"> <a href="${item.url}"> Visit Site </a></span>
         </button>

         <span class="rating-span"> ${item.rating}<i class="far fa-star"></i> </span>
         
         </span>
         <p> ${item.desc} </p>
         
        </div>
        `;
  } 

  return `
    <li class = "bookmark-element "  data-bookmark-id="${item.id}">
      <span class="bookmark-item-title  star-title"> ${item.title} ${bookmarkTitle} </span>
      ${bookmarkExpandView}
      </li>
      `;
};

const generateBookmarksString = function (mybookmark) {
  const items = mybookmark.map((item) => generateBookmarksElement(item));
  return items.join('');
};


const render = function() {
  //renderError();

  let form = ``;

  let items = [...store.myData.bookmarks];

  if(store.myData.adding) {
    form = `
    <fieldset class="bookmarkDetails">
        <Legend>Adding New Bookmark</Legend>
        <div>
                <label for="bookmark-title-input" class="inputAndTitle">Title :</label>
                <input type = "text" class="bookmark-title-input" name="bookmark-title-input" placeholder="Enter  title here" required/>
        </div>
        <div>
                <label for=""bookmark-url" class="inputAndTitle">URL :</label>
                <input type = "url" class="bookmark-url" name="bookmark-url" placeholder="https://www.google.com/" required/>
        </div>
        
        <div>
          <label for= "AddFilterByRating">Rating(s):</label>
          <input class="AddFilterByRating" name="AddFilterByRating" type="number" placeholder="Enter Rating from 1-5" min="1" max="5" required 1>     
      </div> 

        <div class="AddBookmarkdesc">
          <label class="desc-label" for="addBookmarkDescription">Description</label>
          <textarea class="addBookmarkDescription" name = "addBookmarkDescription" rows = 5 ></textarea>
           
        </div>
        
        <button type="submit" class="btn bookmark-btn-create">Create</button>
        <button type="button" class="btn bookmark-btn-cancel" >Cancel</button>
    </fieldset>`;
  }

  $('.displayBookmarkForm').html(form);

  if(store.myData.adding) {
    handleCancelBtn();
  }

  if(store.filter >= 1) {
    items = store.myData.bookmarks.filter(bookmark => bookmark.rating >= store.filter);
  }
  
  const bookmarkListItemString = generateBookmarksString(items);

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
    const item = store.findById(id);
    store.findAndUpdate(id, {expanded: !item.expanded});
    render();
  });
};

const handleBookmarkAdd = function() {
  $('.displayBookmarkForm').submit(function(event){
    event.preventDefault();

    const newTitle = $('.bookmark-title-input').val();
    const newUrl = $('.bookmark-url').val();
    const newRating = parseInt($('.AddFilterByRating').val());
    let newDesc = $('.addBookmarkDescription').val();

    $('.bookmark-title-input').val('');
    $('.bookmark-url').val('');
    $('.addBookmarkDescription').val('');

    const newBookmark = { title: newTitle, url: newUrl, rating: newRating, desc: newDesc};

    api.createBookmarks(newBookmark)
      .then( newItem => {
        store.addItem(newItem);
        store.toggleAddingBookmark();
        render();
      })
      .catch(error => {
        store.setError(error.message);
        //renderError();
      });
  });
};

const handleDeleteBookmarkClicked = function() {
  $('.bookmarks-list-results').on('click', '.delete-btn', event => {
    const id = getElementID(event.currentTarget);
    api.deleteBookmarks(id)
      .then(() => {
        store.findAndDelete(id);
        render();
      })
      .catch((error) => {
        store.setError(error.message);
        //renderError();
      });
  });
  
};

const handleFilterRatingsDropdown = function () {
  $('.filter').on('change', function () {
    let filterResults = parseInt($(this).val(), 10);
    store.filter = filterResults;
    render();
  });
};

// const  generatorError = function(message) {
//   return `
//   <section class="error-content" role="alert">
//     <p>${message}</p>
//     <button type="button" id="cancel-error" role="close-error"><i class="fa fa-times"></i></button>
//   </section>
//   `;
// };

// const renderError = function() {
//   if(store.error) {
//     const el = generatorError(store.error);
//     $('.error-container').html(el);
//   }else {
//     $('.error-container').empty();
//   }
// };

// const handleCloseError = function() {
//   $('.error-container').on('click', '#cancel-error', function() {
//     store.error(null);
//     renderError();
//   });
// };


const bindEventListeners = function() {
  handleBookmarkClicked();
  handleNewBookmarkSubmit();
  handleBookmarkAdd();
  handleCancelBtn();
  handleDeleteBookmarkClicked();
  handleFilterRatingsDropdown();
  //handleCloseError();
};

export default {
  bindEventListeners,
  render
};

