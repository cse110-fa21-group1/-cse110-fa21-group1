import {storage} from './storage.js';
import {url} from './url.js';

const heart = document.getElementById('heart');

const id = url.getURLid();

if (storage.isPinned(id, !(url.isSearched()))) {
  heart.classList = 'liked';
}

heart.addEventListener('click', (event) => {
  if (heart.classList.contains('liked')) {
    storage.unpinRecipe(id, !(url.isSearched()));
    heart.classList = '';
  } else {
    storage.pinRecipe(id, !(url.isSearched()));
    heart.classList = 'liked';
  }
});
