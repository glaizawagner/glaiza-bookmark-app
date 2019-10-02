const myData = {
  bookmarks: [],
  adding: false,
  error: null,
  filter: 0
};


const findById = function (id) {
    return this.myData.bookmarks.find(currentItem => currentItem.id === id);

};
  
const addItem = function (newBookmark) {
  Object.assign(newBookmark, {expanded: false});
  this.myData.bookmarks.push(newBookmark);
};
  
  
const findAndDelete = function(id) {
  this.myData.bookmarks = this.myData.bookmarks.filter(currentItem => currentItem.id !==id);
};
  
const findAndUpdate = function(id, newData) {
  let currentItem = this.findById(id);
  Object.assign(currentItem, newData);
};
  
const toggleAddingBookmark = function() {
  this.myData.adding = !this.myData.adding;
};
  
const setError = function(error) {
  this.myData.error = error;
};


   
  
export default {
  myData,
  findById,
  addItem,
  findAndDelete,
  findAndUpdate,
  toggleAddingBookmark,
  setError
};