// storage.js

export const storage = {};

/** Initialize localstorage for counting recipes created */
storage.init = () => {
  // Initialize our recipe count for generating IDs
  if (localStorage.getItem('numRecipesCreated') == undefined ||
      localStorage.getItem('numRecipesCreated') == 'NaN') {
    localStorage.setItem('numRecipesCreated', '0');
    localStorage.setItem('pinned', '[]');
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
  // Increase accumulating count for generating id
  storage.increaseCount();
  // Format: 7-digit number
  // 0000001, 0000002, 0000003, ...
  // Current limit is up to 9999999
  return ('000000'+storage.currentCount()).slice(-7);
};

/**
 * Return an array of all saved recipes
 * @return {Array} An array of all saved recipes' id
 */
storage.getRecipes = () => {
  const ids = storage.getRecipeIDs();
  return ids.map((id) => storage.getRecipe(id)) || [];
};

/**
 * Adds a recipe to storage
 * @param {Recipe} recipe recipe in json format
 * @return {String} id of the new recipe
 */
storage.addRecipe = function(recipe) {
  // Get current recipes
  const currRecipes = storage.getRecipeIDs();
  // Add recipe to recipes
  recipe.id = storage.generateNewId();
  currRecipes.push(recipe.id);
  localStorage.setItem('recipes', JSON.stringify(currRecipes));
  localStorage.setItem(recipe.id, JSON.stringify(recipe));
  return recipe.id;
};

/**
 * Return the index of a recipe with a given id
 * @param {Int} id ID of the reicipe to be searched
 * @return {Int} index of the recipe
 */
storage.getRecipeIndex = function(id) {
  const currRecipes = storage.getRecipes();
  for (let i = 0; i < currRecipes.length; i++) {
    if (currRecipes[i] == id) {
      return i;
    }
  }
  return -1;
};

/**
 * Removes a recipe from our recipes
 * @param {String} id ID of a recipe
 */
storage.removeRecipe = function(id) {
  // Get the current recipes
  const currRecipes = storage.getRecipes();
  // Get the index of the recipe to remove
  const indexOfId = storage.getRecipeIndex(id);
  // Remove the recipe
  if (indexOfId > -1) currRecipes.splice(indexOfId, 1);
  localStorage.setItem('recipes', JSON.stringify(currRecipes));
  localStorage.removeItem(id);
};

/**
 * Update the recipe, match using id
 * @param {Recipe} recipe The updated version of the recipe
 * @return {String} id of the reciped being edited
 */
storage.editRecipe = function(recipe) {
  // Get the index of the recipe to remove
  const indexOfId = storage.getRecipeIndex(recipe.id);
  // Error checking - if the recipe is actually new but not editing an old one
  if (indexOfId < 0) {
    const newId = storage.addRecipe(recipe);
    return newId;
  } else {
    currRecipes[indexOfId] = recipe;
    localStorage.setItem(recipe.id, JSON.stringify(recipe));
    return recipe.id;
  }
};

/**
 * Get recipe info with id
 * @param {String} id id of the recipe
 * @return {Recipe} requestedrecipe object
 */
storage.getRecipe = function(id) {
  return JSON.parse(localStorage.getItem(id)) || {};
};

/**
 * Return a set of recipe ids in localstorage
 * @return {Array} List of recipe ids in localstorage
 */
storage.getRecipeIDs = function() {
  return JSON.parse(localStorage.getItem('recipes')) || [];
};

/**
 * Pin recipe with given id
 * @param {String} id id of the recipe to be pinned
 */
storage.pinRecipe = function(id) {
  const recipe = JSON.parse(localStorage.getItem(id));
  recipe.pinned = true;
  storage.editRecipe(recipe);
};

/**
 * Unpin recipe with given id
 * @param {String} id id of the recipe to be unpinned
 */
storage.unpinRecipe = function(id) {
  const recipe = JSON.parse(localStorage.getItem(id));
  recipe.pinned = false;
  storage.editRecipe(recipe);
};

/**
 * Save search result for later use
 * @param {String} result Search result in json format
 */
storage.setSearchedRecipes = function(result) {
  // Result - from json to Object
  const recipes = JSON.parse(result);
  const recipesFormatted = [];
  // For each recipes searched
  // Reason for this formatting loop is that
  // Spoonacular doesn't follow the standard Google json format
  for (let i = 0; i < recipes.length; i++) {
    // Format from Spoonacular format into the standard format
    const recipe = storage.formatRecipe(recipes[i]);
    // Push formatted recipe
    recipesFormatted.push(recipe);
  }
  // Save all formatted recipes (as Json String)
  localStorage.setItem('searchRecipes', JSON.stringify(recipesFormatted));
};

/**
 * Return recipe from search results
 * @param {id} id Id of the target recipe
 * @return {Recipe} recipe queried
 */
storage.getSearchedRecipe = function(id) {
  const currRecipes = JSON.parse(localStorage.getItem('searchRecipes'));
  for (let i = 0; i < currRecipes.length; i++) {
    // Get recipe by comparing ids
    if (currRecipes[i].id == id) {
      return currRecipes[i];
    }
  }
  return {};
};

/**
 * Return recipes from search results
 * @return {Recipe} recipes in latest search
 */
storage.getSearchedRecipes = function() {
  return JSON.parse(localStorage.getItem('searchRecipes'));
};

/**
 * Return formatted recipe
 * @param {Recipe} recipe Recipe from Spoonacular
 * @return {Recipe} formatted recipe
 */
storage.formatRecipe = function(recipe) {
  // Recipe holder
  const formatted = {};
  // Recipe title
  formatted.name = recipe['title'];
  // Recipe thumbnail
  formatted.image = recipe['image'];
  // Recipe description
  formatted.description = recipe['summary'];
  // Recipe cook time
  formatted.totalTime = 'PT' +
    Math.floor(recipe['readyInMinutes']/60) + 'H' +
    (recipe['readyInMinutes']%60) + 'M';
  // Recipe servings
  formatted.recipeYield = recipe['servings'];
  // Recipe ingredients
  formatted.recipeIngredient = [];
  for (let j = 0; j < (recipe['extendedIngredients']).length; j++) {
    const ing = recipe['extendedIngredients'][j]['name'];
    formatted.recipeIngredient.push(ing);
  }
  // Recipe insturctions
  formatted.recipeInstruction = [];
  const majorInstrCount = (recipe['analyzedInstructions']).length;
  for (let i = 0; i < majorInstrCount; i++) {
    // The short summary of the following steps
    const majorInstr = recipe['analyzedInstructions'][i]['name'];
    if (majorInstr != '') {
      // If we have major summarized instructions for the small steps
      formatted.recipeInstruction.push(majorInstr + ':');
    }
    const instrCount = (recipe['analyzedInstructions'][i]['steps']).length;
    // Pad two spaces in front if it is summarized into a major instruction
    const paddingSpace = (majorInstr != '') ? '--> ' : '';
    for (let j = 0; j < instrCount; j++) {
      // Detailed steps of the instruction
      const step = recipe['analyzedInstructions'][i]['steps'][j]['step'];
      formatted.recipeInstruction.push(paddingSpace + step);
    }
  }
  // Recipe id (from spoonacular)
  formatted.id = recipe['id'];
  formatted.pin = false;

  return formatted;
};

/**
 * Reset localstorage
 */
storage.reset = function() {
  // Clear everything in the localstorage
  localStorage.clear();
};
