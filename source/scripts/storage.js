// storage.js

export const storage = {};

/** Initialize localstorage for counting recipes created */
storage.init = () => {
  if (localStorage.getItem('numRecipesCreated') == undefined) {
    localStorage.setItem('numRecipesCreated', 0);
  }
};

/** Increase number of recipes created, mainly for creating id */
storage.increaseCount = () => {
  localStorage.setItem('numRecipesCreated', storage.currentCount+1);
};

/**
 * Return number of recipes created
 * @return {Int} Number of recipes created
 */
storage.currentCount = () => {
  return localStorage.getItem('numRecipesCreated');
};

/**
 * Return generated recipe id for new recipe
 * @return {String} Generated recipe id for new recipe
 */
storage.generateNewId = () => {
  storage.increaseCount();
  return ('000000'+currentCount).slice(-7);
};

/**
 * Return an array of all saved recipes
 * @return {Array} An array of all saved recipes
 */
storage.getRecipes = () => {
  return JSON.parse(localStorage.getItem('recipes')) || [];
};

/**
 * Adds a recipe to storage
 * @param {Recipe} recipe recipe in json format
 */
storage.addRecipe = function(recipe) {
  // Get current recipes
  const currRecipes = storage.getRecipes();
  // Add recipe to recipes
  recipe.id = generateNewId();
  currRecipes.push(recipe);
  localStorage.setItem('recipes', JSON.stringify(currRecipes));
};

/**
 * Return the index of a recipe with a given id
 * @param {Int} id ID of the reicipe to be searched
 * @return {Int} index of the recipe
 */
storage.getRecipeIndex = function(id) {
  const currRecipes = storage.getItems();
  for (let i = 0; i < currRecipes.length; i++) {
    if (currRecipes[i].id == id) {
      return i;
    }
  }
  return -1;
};

/**
 * Removes an item from the cart and then stores that new cart
 * @param {String} id ID of a recipe
 */
storage.removeRecipe = function(id) {
  // Get the current recipes
  const currRecipes = storage.getRecipes();
  // Get the index of the recipe to remove
  const indexOfId = storage.getRecipeIndex(id);
  // Remove that index of the item to remove from the recipes
  if (indexOfId > -1) currRecipes.splice(indexOfId, 1);
  localStorage.setItem('recipes', JSON.stringify(currRecipes));
};

/**
 * Get recipe info with id
 * @param {String} id id of the recipe
 * @return {Recipe} requestedrecipe object
 */
storage.getRecipe = function(id) {
  const currRecipes = storage.getRecipes();
  for (let i = 0; i < currRecipes.length; i++) {
    if (currRecipes[i].id == id) {
      currRecipes[i];
    }
  }
  return null;
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
