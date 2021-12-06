// recipeDisplay.js

import {storage} from './storage.js';
import {url} from './url.js';
// import {recipeDemo} from './Recipe.js';

window.addEventListener('DOMContentLoaded', init);

/**
 * Start opulating recipe info
 */
function init() {
  storage.init();
  // Demo recipe - http://127.0.0.1:5501/source/Recipe.html?id=0000001
  // Demo searched recipe - http://127.0.0.1:5501/source/Recipe.html?searched=true&id=637876 (search chicken)
  // if (storage.currentCount() == 0) {
  //   storage.addRecipe(recipeDemo);
  // }
  populateRecipe();
}

/**
 * Populate recipe info
 */
function populateRecipe() {
  // Extract query id
  const id = url.getURLid();
  // Fetch recipe from local storage
  const recipe = (url.isSearched()) ?
                    storage.getSearchedRecipe(id) :
                    storage.getRecipe(id);
  if (Object.keys(recipe).length == 0) return; // TODO: catch error

  // If it is user's recipe, allow user to delete recipe
  // if (urlParams.get('searched') != 'true') {
  //   const deleteBtn = document.querySelector('#delete-button');
  //   deleteBtn.style.visibility = 'visible';
  // }
  // TOOD: delete user button

  // Populate title
  document.querySelector('#title').innerText = recipe.name;
  // Populate description
  // console.log(recipe.description);
  document.querySelector('#description').innerHTML = recipe.description;
  // Populate cooktime and servings
  const splitTime =
  recipe.totalTime.split(/^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/);
  const totalHr = (isNaN(parseInt(splitTime[1]))) ?
  '?' : splitTime[1];
  const totalMin = (isNaN(parseInt(splitTime[2]))) ?
  '?' : splitTime[2];
  const hrTxt = (!isNaN(parseInt(splitTime[1])) && splitTime[1] == 1) ?
  ' hr ' : ' hrs ';
  document.querySelector('#cookTime').innerText =
  (!isNaN(parseInt(splitTime[1])) && splitTime[1] == 0) ?
  'Total: ' + totalMin + ' min' :
  'Total: ' + totalHr + hrTxt + totalMin + ' min';
  document.querySelector('#Serving').innerText =
  recipe.recipeYield + ' Servings';
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
  // Populate video
  // const vdoBlock = document.querySelector('video');
  // if (recipe.video != 'undefined') {
  //   vdoBlock.src = recipe.video;
  // } else {
  //   vdoBlock.style.display = 'none';
  // }
  const vdoBlock = document.getElementById('rec-vid');
  const imgBlock = document.getElementById('rec-pic');
  imgBlock.src = recipe.image;
  if (!recipe.video || recipe.video.length == 0) {
    vdoBlock.classList.add('hidden');
  } else {
    const el = document.createElement('script');
    el.addEventListener('error', function(e) {
      vdoBlock.classList.add('hidden');
    });
    el.src = (vdoBlock.src = recipe.video);
    document.head.appendChild(el);
  }
}
