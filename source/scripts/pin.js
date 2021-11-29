import {storage} from './storage.js';

const Button = document.getElementById('pin-button');

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id');

if (storage.isPinned(id) == true) {
  Button.innerText = 'Remove from favorite';
} else {
  Button.innerText = 'Add to favorite';
}

Button.addEventListener('click', (event) => {
  // if this recipe is not stored in local storage, thus from spoonacular
  if (!storage.isPinned(id)) {
    storage.pinRecipe(id);
    // console.log('here');
    // change button innerText
    Button.innerText = 'Remove from favorite';
  } else {
    storage.unpinRecipe(id);
    // console.log('there');
    // change button innerText
    Button.innerText = 'Add to favorite';
  }
});