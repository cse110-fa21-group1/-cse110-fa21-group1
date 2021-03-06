// url.js

export const navigation = {};
export const url = {};

/**
 * Check if we are editing a recipe
 * @return {String} the editing recipe id if editing, else '-1'
 */
url.isEdit = () => {
  // console.log('storage:' + storage);
  // Extract query id
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const id = urlParams.get('id');
  return id != null ? id : '-1';
};

/**
 * Return id query in url
 * @return {String} id query in url, -1 if not found
 */
url.getURLid = () => {
  return url.isEdit();
};

/**
 * Check if we are editing from a searched recipe
 * @return {Boolean} true if yes, else false
 */
url.isSearched = () => {
  // Extract query id
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get('searched') != null;
};

/**
 * Return offset for recipe search
 * @return {Integer} offset for recipe search
 */
url.getOffset = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return parseInt(urlParams.get('offset')) || 0;
};

/**
 * Return search query
 * @return {String} search query
 */
url.getQuery = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get('q') || '';
};

/**
 * Return if is getting pinned recipes only
 * @return {Boolean} is getting pinned recipes
 */
url.isPinnedRecipes = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get('pinned') == 'true';
};

/**
 * Determine if we are in development stage (in source folder)
 * @param {String} s window.location.pathname
 * @return {Boolean} whether we are in development stage
 */
url.isDevelopment = () => {
  return window.location.pathname.startsWith('/source');
};

/**
 * Helper function for search/explore
 * @param {String} query Query string for search/exploring
 * @param {Boolean} search Whether we are searching or exploring user's recipes
 * @param {Integer} offset Offset for search results
 * @param {Boolean} pinned Whether we are seeing pinned recipes only or not
 */
navigation.toExplore =
  (query = '', search = false, offset = 0, pinned = false) => {
    window.location.href =
        window.location.origin +
        (url.isDevelopment() ? '/source' : '') +
        '/Explore.html?' +
        (search ? 'searched=true&q=' + query + '&' : '') +
        (offset > 0 ? '&offset=' + offset + '&' : '') +
        (pinned ? 'pinned=true' : '');
  };

/** Navigate to Home.html */
navigation.toHome = () => {
  window.location.href =
      window.location.origin +
      (url.isDevelopment() ? '/source' : '') +
      '/Home.html';
};

/**
 * Navigate to ManageRecipe.html
 * @param {Boolean} isAdd is adding a recipe, if not then edit
 */
navigation.toManageRecipe = (isAdd = true) => {
  let param = '';
  if (url.isSearched()) {
    param = window.location.search;
  } else if (isAdd) {
    param = '';
  } else {
    param = (url.isEdit() != -1 ? '?id=' + url.isEdit() : '');
  }
  window.location.href =
      window.location.origin +
      (url.isDevelopment() ? '/source' : '') +
      '/ManageRecipe.html' +
      param;
};

/**
 * Navigate to Recipe.html
 * @param {String} id id of the recipe
 * @param {Boolean} isNew is opening a new recipe
 */
navigation.toRecipe = (id, isNew=false) => {
  window.location.href =
    window.location.origin +
    (url.isDevelopment() ? '/source' : '') +
    '/Recipe.html?' +
    (!isNew && url.isSearched() ?
      'searched=true&id=' + id :
      'id=' + id);
};
