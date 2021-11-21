// deleteRecipe.js
// When user click the delete button in at the top of the recipe, the
// recipe should be removed and the user should be lead to the home pagex

import {storage} from './storage.js';

const deleteButton = document.getElementById('nav-delete');

deleteButton.addEventListener('click', (event) => {
  event.preventDefault();
  // console.log('storage:' + storage);
  // Extract query id
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const id = urlParams.get('id');

  // Remove the recipe
  storage.removeRecipe(id);

  // Go back to home page
  window.location.href =
    window.location.origin +
    window.location.pathname.replace('Recipe.html', 'Home.html');
});
