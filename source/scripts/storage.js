// storage.js

export const storage = {};

/**
 * Return an array of all saved recipes
 * @return {Array} An array of all saved recipes
 */
storage.getItems = () => {
  return JSON.parse(localStorage.getItem('recipes')) || [];
};

/**
 * Adds a recipe to storage
 * @param {String} recipe recipe in json format
 */
storage.addItem = function(recipe) {
  // Get current recipes
  const currRecipes = storage.getItems();
  // Add recipe to recipes
  currRecipes.push(recipe);
  localStorage.setItem('recipes', JSON.stringify(currRecipes));
};

/**
 * Removes an item from the cart and then stores that new cart
 * @param {String} id ID of a recipe
 */
storage.removeItem = function(id) {
  // Get the current recipes
  const currRecipes = storage.getItems();
  // Get the index of the recipe to remove
  const indexOfId = storage.getRecipeIndex(id);
  // Remove that index of the item to remove from the recipes
  if (indexOfId > -1) currRecipes.splice(indexOfId, 1);
  localStorage.setItem('recipes', JSON.stringify(currRecipes));
};

storage.getItem = function(id) {
  const currRecipes = storage.getItems();
  return currRecipes[storage.getRecipeIndex(id)];
};

/**
 * Return the index of a recipe with a given id
 * @param {Int} id ID of the reicipe to be searched
 * @return {Int} index of the recipe
 */
storage.getRecipeIndex = function(id) {
  const currRecipes = storage.getItems();
  for (let i = 0; i < currRecipes; i++) {
    if (currRecipes[i]['id'] == id) {
      return i;
    }
  }
  return -1;
};

/**
 * Return a set of recipe ids in localstorage
 * @return {Set} Set of recipe ids in localstorage
 */
storage.getRecipeIDs = function() {
  const currRecipes = storage.getItems();
  return new Set(currRecipes.map((a) => a['id']) || []);
};

/**
 * Save search result for later use
 * @param {String} result Search result in json format
 */
storage.setSearchedRecipes = function(result) {
  localStorage.setItem('searchRecipes', result);
};

/**
 * Reset localstorage
 */
storage.reset = function() {
  localStorage.clear();
};
