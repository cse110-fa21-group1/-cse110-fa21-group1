// storage.js

export const storage = {};

/** Initialize localstorage for counting recipes created */
storage.init = () => {
  // Initialize our recipe count for generating IDs
  if (localStorage.getItem('numRecipesCreated') == undefined ||
      localStorage.getItem('numRecipesCreated') == 'NaN') {
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
  // Increase accumulating count for generating id
  storage.increaseCount();
  // Format: 7-digit number
  // 0000001, 0000002, 0000003, ...
  // Current limit is up to 9999999
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
 * @return {String} id of the new recipe
 */
storage.addRecipe = function(recipe) {
  // Get current recipes
  const currRecipes = storage.getRecipes();
  // Add recipe to recipes
  recipe.id = storage.generateNewId();
  currRecipes.push(recipe);
  localStorage.setItem('recipes', JSON.stringify(currRecipes));
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
    if (currRecipes[i].id == id) {
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
  // Remove that index of the item to remove from the recipes
  if (indexOfId > -1) currRecipes.splice(indexOfId, 1);
  localStorage.setItem('recipes', JSON.stringify(currRecipes));
};

/**
 * Update the recipe, match using id
 * @param {Recipe} recipe The updated version of the recipe
 * @return {String} id of the reciped being edited
 */
storage.editRecipe = function(recipe) {
  // Get the current recipes
  const currRecipes = storage.getRecipes();
  // Get the index of the recipe to remove
  const indexOfId = storage.getRecipeIndex(recipe.id);
  // Error checking - if the recipe is actually new but not editing an old one
  if (indexOfId > -1) {
    const newId = storage.addRecipe(recipe);
    return newId;
  } else {
    currRecipes[indexOfId] = recipe;
    return recipe.id;
  }
};

/**
 * Get recipe info with id
 * @param {String} id id of the recipe
 * @return {Recipe} requestedrecipe object
 */
storage.getRecipe = function(id) {
  const currRecipes = storage.getRecipes();
  for (let i = 0; i < currRecipes.length; i++) {
    // Get Recipe by comparing ids
    if (currRecipes[i].id == id) {
      return currRecipes[i];
    }
  }
  // Return empty object when not found (error)
  return {};
};

/**
 * Return a set of recipe ids in localstorage
 * @return {Set} Set of recipe ids in localstorage
 */
storage.getRecipeIDs = function() {
  const currRecipes = storage.getRecipes();
  return new Set(currRecipes.map((a) => a['id']) || []);
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
    // Recipe holder
    const recipe = {};
    // Recipe title
    recipe.name = recipes[i]['title'];
    // Recipe thumbnail
    recipe.image = recipes[i]['image'];
    // Recipe description
    recipe.description = recipes[i]['summary'];
    // Recipe cook time
    recipe.totalTime = 'PT' +
      Math.floor(recipes[i]['readyInMinutes']/60) + 'H' +
      (recipes[i]['readyInMinutes']%60) + 'M';
    // Recipe servings
    recipe.recipeYield = recipes[i]['servings'];
    // Recipe ingredients
    recipe.recipeIngredient = [];
    for (let j = 0; j < (recipes[i]['extendedIngredients']).length; j++) {
      const ing = recipes[i]['extendedIngredients'][j]['name'];
      recipe.recipeIngredient.push(ing);
    }
    // Recipe insturctions
    recipe.recipeInstruction = [];
    const instrCount = (recipes[i]['analyzedInstructions'][0]['steps']).length;
    for (let j = 0; j < instrCount; j++) {
      const step = recipes[i]['analyzedInstructions'][0]['steps'][j]['step'];
      recipe.recipeInstruction.push(step);
    }
    // Recipe id (from spoonacular)
    recipe.id = recipes[i]['id'];
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
storage.getSearchedRecipes = function(id) {
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
 * Reset localstorage
 */
storage.reset = function() {
  // Clear everything in the localstorage
  localStorage.clear();
};
