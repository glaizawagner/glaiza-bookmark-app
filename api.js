/* eslint-disable no-console */
const BASE_URL = 'https://thinkful-list-api.herokuapp.com/glaiza/bookmarks';

function listApiFetch(...args) {
  let err;
  return fetch(...args)
    .then(res => {
      if (!res.ok) {
        err = { code: res.status };
        if(!res.headers.get('conent-type').includes('json')) {
          err.message = res.statusText;
          return Promise.reject(err);
        }
      }

      return res.json();
    })

    .then(data => {
      if (err) {
        err.message = data.message;
        return Promise.reject(err);
      }

      return data;
    });

}

const getAllBookmarks = function () {
  return listApiFetch(`${BASE_URL}`);
};

const createBookmarks = function (bookmark) {
  const newBookmark = JSON.stringify(bookmark); 
  return listApiFetch(`${BASE_URL}`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: newBookmark
  });
};

const updateBookmarks = function (id, updateData) {
  const newData = JSON.stringify(updateData);
  return listApiFetch(`${BASE_URL}/${id}`, {
    method: 'PATCH',
    headers: {'Content-Type': 'application/json'},
    body: newData
  });
};

const deleteBookmarks = function (id) {
  return listApiFetch(BASE_URL + '/' + id, {
    method: 'DELETE'
  });
};



export default {
  getAllBookmarks,
  createBookmarks,
  deleteBookmarks,
  updateBookmarks
};