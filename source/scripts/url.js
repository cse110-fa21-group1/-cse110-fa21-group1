// url.js

/**
 * Check if we are editing a recipe
 * @return {String} the editing recipe id if editing, else '-1'
 */
export function isEdit() {
  // console.log('storage:' + storage);
  // Extract query id
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const id = urlParams.get('id');
  return id != null ? id : '-1';
}

/**
 * Check if we are editing from a searched recipe
 * @return {Boolean} true if yes, else false
 */
export function isSearched() {
  // console.log('storage:' + storage);
  // Extract query id
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get('searched') != null;
}
