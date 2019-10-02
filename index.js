import bookmarks from './bookmarks.js';
import store from './store.js';
import api from './api.js';


const main = function() {
  api.getAllBookmarks()
    .then(res => res.json())
    .then(items => {
      items.forEach(item => store.addItem(item));
      console.log(items, 'api in index.js');
      bookmarks.render();
    });
  bookmarks.bindEventListeners();
  bookmarks.render();
};

$(main);
