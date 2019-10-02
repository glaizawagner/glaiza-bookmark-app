const STORE = { 
  bookmarks: [], 
  adding: false,
  error: null,
  filter: 0
};
  
   
  
const findById = function(id) {
  return this.STORE.booksmarks.find(currentItem => currentItem.id === id);
};
  
const addItem = function (newBookmark) {
  Object.assign(newBookmark, {expanded:false})
  this.STORE.bookmarks.push(newBookmark);
};
  
  
const findAndDelete = function(id) {
  this.STORE.bookmarks = this.STORE.bookmarks.filter(currentItem => currentItem.id !==id);
};
  
const findAndUpdate = function(id, newData) {
  let currentItem = this.findById(id);
  Object.assign(currentItem, newData);
};
  
const toggleAdding = function() {
  this.STORE.adding = !this.STORE.adding;
};
  
const setError = function(error) {
  this.error = error;
};
   
  
export default {
  STORE,
  findById,
  addItem,
  findAndDelete,
  findAndUpdate,
  toggleAdding,
  setError
};