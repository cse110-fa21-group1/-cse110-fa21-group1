// storage.js

export const storage = {};

/** Initialize localstorage for counting recipes created */
storage.init = () => {
  if (localStorage.getItem('numRecipesCreated') == undefined) {
    localStorage.setItem('numRecipesCreated', '0');
  }
};

/** Increase number of recipes created, mainly for creating id */
storage.increaseCount = () => {
  const newCount = (storage.currentCount()+1).toString();
  localStorage.setItem('numRecipesCreated', newCount);
};

/**
 * Return number of recipes created
 * @return {Int} Number of recipes created
 */
storage.currentCount = () => {
  return parseInt(localStorage.getItem('numRecipesCreated'));
};

/**
 * Return generated recipe id for new recipe
 * @return {String} Generated recipe id for new recipe
 */
storage.generateNewId = () => {
  storage.increaseCount();
  return ('000000'+storage.currentCount()).slice(-7);
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
  recipe.id = storage.generateNewId();
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
      return currRecipes[i];
    }
  }
  return {};
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
  const recipes = JSON.parse(result);
  const recipesFormatted = [];
  for (let i = 0; i < recipes.length; i++) {
    const recipe = {};
    recipe.name = recipes[i]['title'];
    recipe.image = recipes[i]['image'];
    recipe.description = recipes[i]['summary'];
    recipe.totalTime = 'PT' +
      Math.floor(recipes[i]['readyInMinutes']/60) + 'H' +
      (recipes[i]['readyInMinutes']%60) + 'M';
    recipe.recipeYield = recipes[i]['servings'];
    recipe.recipeIngredient = [];
    for (let j = 0; j < (recipes[i]['extendedIngredients']).length; j++) {
      const ing = recipes[i]['extendedIngredients'][j]['name'];
      recipe.recipeIngredient.push(ing);
    }
    recipe.recipeInstruction = [];
    const instrCount = (recipes[i]['analyzedInstructions'][0]['steps']).length;
    for (let j = 0; j < instrCount; j++) {
      const step = recipes[i]['analyzedInstructions'][0]['steps'][j]['step'];
      recipe.recipeInstruction.push(step);
    }
    recipe.id = recipes[i]['id'];
    recipesFormatted.push(recipe);
  }
  localStorage.setItem('searchRecipes', JSON.stringify(recipesFormatted));
};

/**
 * Return recipe from search results
 * @param {id} id Id of the target recipe
 * @return {Recipe} recipe queried
 */
storage.getSearchedRecipes = function(id) {
  const currRecipes = JSON.parse(localStorage.getItem('searchRecipes'));
  for (let i = 0; i < currRecipes.length; i++) {
    if (currRecipes[i].id == id) {
      return currRecipes[i];
    }
  }
  return {};
};

/**
 * Reset localstorage
 */
storage.reset = function() {
  localStorage.clear();
};
