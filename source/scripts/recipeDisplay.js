// recipeDisplay.js

import {storage} from './storage.js';
// import {recipeDemo} from './Recipe.js';

window.addEventListener('DOMContentLoaded', init);

/**
 * Start opulating recipe info
 */
function init() {
  storage.init();
  if (storage.currentCount == 0) {
    storage.addRecipe(recipeDemo);
  }
  populateRecipe();
}

/**
 * Populate recipe info
 */
function populateRecipe() {
  // Extract query id
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const id = urlParams.get('id');
  // Fetch recipe from local storage
  const recipe = storage.getRecipe(id);
  if (Object.keys(recipe).length == 0) return; // TODO: catch error
  // Populate title
  document.querySelector('#title').innerText = recipe.name;
  // Populate description
  console.log(recipe.description);
  document.querySelector('#description').innerText = recipe.description;
  // Populate cooktime and servings
  document.querySelector('#cooktimeAndServing').innerText =
    'Cooktime = ' + recipe.totalTime + '\n' +
    'Servings = ' + recipe.recipeYield;
  // Populate ingredients
  const ingredientList = document.querySelector('#thelist');
  ingredientList.innerHTML = '';
  for (let i=0; i<recipe.recipeIngredient.length; i++) {
    const ingredient = document.createElement('li');
    ingredient.innerText = recipe.recipeIngredient[i];
    ingredientList.appendChild(ingredient);
  }
  // Populate instructions
  const instructionList = document.querySelector('#insutrctionList');
  instructionList.innerHTML = '';
  for (let i=0; i<recipe.recipeInstruction.length; i++) {
    const instruction = document.createElement('li');
    instruction.innerText = recipe.recipeInstruction[i];
    instructionList.appendChild(instruction);
  }
}
