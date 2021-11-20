// finishEditRecipe.js
// When user click the back button at the top of the recipe, the
// user shall start edit and after that prompt to the recipe page.
import {storage} from './storage.js';

const returnButton = document.querySelector('finish-edit');

returnButton.addEventListener('click', (event) => {
  // console.log('storage:' + storage);
  // Extract query id
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const id = urlParams.get('id');

  // edit recipe
  const recipe = storage.getRecipe(id);
  storage.editRecipe(recipe);

  // go back to recipe
  window.location.href =
  window.location.pathname.replace('ManageRecipe.html', 'Recipe.html'); 
});
