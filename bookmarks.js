/* eslint-disable no-unreachable */
/* eslint-disable no-console */
import api from './api.js';
import store from './store.js';


const generateBookmarksElement = function(item) {

  
  let bookmarkExpandView = ``;
  let hiddenClass = '';

  let bookmarkTitle = `<span class="rating-span"> ${item.rating} <i class="far fa-star"></i> </span>`;

  if(item.expanded) {
    bookmarkTitle =  `<button class="delete-btn">
        <span class="delete-btn-label"> <i class="far fa-trash-alt"></i> </span>
      </button>
      `;

    bookmarkExpandView = `
        <div class = "expandContent">
          <button class="visit-btn"> 
          <span class="visit-btn-label"> <a href="${item.url}"> Visit Site </a></span>
          </button>

          <span class="rating-span"> ${item.rating}<i class="far fa-star"></i> </span>
          <p> ${item.desc} </p>
        </div>
        `;
  } 
  // console.log(store.filter);
  // console.log(item.rating);

  // if(store.filter === store.rating){
  //   console.log('equal');
  //     // return ` <li class = "bookmark-element "  data-bookmark-id="${item.id}">
  //     //   <span class="bookmark-item-title ${hiddenClass}"> ${item.title} ${bookmarkTitle} </span>
  //     //   ${bookmarkExpandView}
  //     //   </li>
  //     // `;
  // } else {
  //   // alert('no filter for that record');
  // }


  // // if(store.filter === store.myData.bookmarks.rating){
  // //   console.log('they are equal');
  // //   return `
  // //      <li class = "bookmark-element "  data-bookmark-id="${item.id}">
  // //     <span class="bookmark-item-title ${hiddenClass}"> ${item.title} ${bookmarkTitle} </span>
  // //     ${bookmarkExpandView}
  // //     </li>
  // //     `;
  // // } 

  return `
    <li class = "bookmark-element "  data-bookmark-id="${item.id}">
      <span class="bookmark-item-title ${hiddenClass}"> ${item.title} ${bookmarkTitle} </span>
      ${bookmarkExpandView}
      </li>
      `;
 
};

const generateBookmarksString = function (mybookmark) {
  const items = mybookmark.map((item) => generateBookmarksElement(item));
  return items.join('');
};


const render = function() {

  let form = ``;

  store.myData.filter = 0;

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
          <select class= "AddFilterByRating" name="AddFilterByRating" required>
          <option selected disabled>Select Ratings</option>
          <option value=5>★★★★★</option>
          <option value=4>★★★★☆</option> 
          <option value=3>★★★☆☆</> 
          <option value=2>★★☆☆☆</option> 
          <option value=1>★☆☆☆☆</option> 
        </select>       
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
  
  if(store.filter){
    $('.bookmarks-list-results').html('');
    console.log(store.filter);
    const bookmarkFilter = generateBookmarksString(items);
    console.log(bookmarkFilter);
    $('.bookmarks-list-results').html(bookmarkFilter);

  
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

    console.log(newDesc);

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
        render();
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
      .catch((error) => store.setError(error.message));
  });
  
};
// const createFilteredBookmarkListHTML = function(item) {
//   $('.bookmarks-list-results').append(`
//   <li id= "${item.id}">
//     <form class= "expandElementButton">
//       <button type="submit" class="titleAndRatingButton" aria-expanded="false"> 
//         <div class="titleAndRating">
//           <div class= "title"> 
//             Title:<span class= "js-titleSpan"> ${item.title}</span>
//           </div>
//           <div class = "rating">
//             Rating:<span class= "js-ratingSpan">${item.rating} Stars</span>
//           </div>
//         </div>
//       </button>
//     </form>
//     <div class= "js-expandContent ${item.expanded ? '' : 'hidden'}" aria-live='polite'>
//       <form action= "${item.url}" target="_blank">
//         <label for= "visitSite" class="hidden">Visit Site</label>
//         <input class= "visitSiteButton" type="submit" value="Visit Site" id= "visitSite"/>
//       </form>
//       <p>${item.desc}</p>
//       <form class= "js-DeleteButton">
//         <button type= "submit" class="deleteBookmarkButton">Delete Bookmark?</button>
//       </form>
//     </div>
//   </li>
//   `);

// }

// const filterBookmarkList = function () {
//   const filterRatingsValue = store.myData.filter;
//   const filteredItems = store.myData.bookmarks.filter(item => item.rating >= filterRatingsValue);
//   $('.bookmarks-list-results').html('');

//   filteredItems.forEach(item => createFilteredBookmarkListHTML(item));
//   $('.bookmarks-list-results').html(filteredItems);
// };

const handleFilterRatingsDropdown = function () {
  $('.container').on('change', '.filter', function () {
    let filter = parseInt($(this).val(), 10);
    store.filterBookmarks(filter);
    render();
  });
};

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

