/* eslint-disable no-console */
const BASE_URL = 'https://thinkful-list-api.herokuapp.com/glaiza/bookmarks';

function listApiFetch(...args) {
  let error;
  return fetch(...args)
    .then(res => {
      if (!res.ok) {
        // Valid HTTP response but non-2xx status - let's create an error!
        error = { code: res.status };
      }

      // In either case, parse the JSON stream:
      return res.json();
    })

    .then(data => {
      // If error was flagged, reject the Promise with the error object
      if (error) {
        error.message = data.message;
        return Promise.reject(error);
      }

      // Otherwise give back the data as resolved Promise
      return data;
    });

}

const getAllBookmarks = function() {
  return listApiFetch(`${BASE_URL}`);
};

const createBookmarks = function(bookmark) {
  let newBookmark = JSON.stringify(bookmark);
  return listApiFetch(`${BASE_URL}`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: newBookmark
  });
};

const updateBookmarks = function(id, updateData) {
  const newData = JSON.stringify(updateData);
  return listApiFetch(`${BASE_URL}/${id}`, {
    method: 'PATCH',
    headers: {'Content-Type': 'application/json'},
    body: newData
  });
};

const deleteBookmarks = function(id) {
  return listApiFetch(`${BASE_URL}/${id}`, {
    method: 'DELETE'
  });
};



export default {
  getAllBookmarks,
  createBookmarks,
  updateBookmarks,
  deleteBookmarks
};