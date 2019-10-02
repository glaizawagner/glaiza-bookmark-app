// id: 'x56w',
// title: 'Title 1',
// rating: 3,
// url: 'http://www.title1.com',
// desc: 'lorem ipsum dolor sit',
// expanded: false

const myData = {
  bookmarks: [],
  addin: false,
  error: null,
  filter: 0
};



const findById = function(id) {
  return this.myData.booksmarks.find(currentItem => currentItem.id === id);
};
  
const addItem = function (newBookmark) {
  this.myData.bookmarks.push(newBookmark);
};
  
  
const findAndDelete = function(id) {
  this.myData.bookmarks = this.myData.bookmarks.filter(currentItem => currentItem.id !==id);
};
  
const findAndUpdate = function(id, newData) {
  let currentItem = this.myData.findById(id);
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