// recipeCard.js

import( '../styles/explore.css' );
import {storage} from './storage.js';
import {url, navigation} from './url.js';

/** Represents a recipe card in the explore page */
class RecipeCard extends HTMLElement {
  /**
   * Creates an instance of RecipeCard.
   *
   * @author: Darwin
   */
  constructor() {
    super(); // inherets everything from HTMLElement
    this.attachShadow({mode: 'open'}); // Creates the Shadow DOM
  }

  /**
   * Set data and create element <recipe-card>
   * @param {Object} data recipe in Object format
   */
  set data(data) {
    this.json = data; // Store the data passed in for later

    // const styles = document.createElement('style');
    const styles = document.createElement('link');
    styles.setAttribute('href', 'styles/explore.css');
    styles.setAttribute('rel', 'stylesheet');
    styles.setAttribute('type', 'text/css');

    // Create the outer wrapper for the recipe to nest inside
    const wrapper = document.createElement('article');
    wrapper.onclick = function(e) {
      if (e.path[0].classList[0] != 'heart') {
        navigation.toRecipe(data.id);
      }
    };

    // Create the recipe image element
    const imgWrapper = document.createElement('div');
    imgWrapper.classList.add('image-wrapper');
    const img = document.createElement('img');
    img.setAttribute('src', data.image);
    img.setAttribute('onerror',
        'this.onerror=null;this.src="assets/image_not_found.png";');

    // Create the like buttons for each recipe
    const heartWrapper = document.createElement('div');
    heartWrapper.classList.add('heart-wrapper');
    const heart = document.createElement('div');

    const HeartButton = document.createElement('button');
    HeartButton.setAttribute('id', 'heartbutton');
    storage.init();
    if (storage.isPinned(data.id, !(url.isSearched()))) {
      heart.classList.add('liked');
    }
    heart.classList.add('heart');

    heart.onclick = function() {
      if (heart.classList.contains('liked')) {
        storage.unpinRecipe(data.id, !(url.isSearched()));
        heart.classList.remove('liked');
      } else {
        storage.pinRecipe(data.id, !(url.isSearched()));
        heart.classList.add('liked');
      }
    };
    heartWrapper.append(heart);
    imgWrapper.append(img, heartWrapper);

    // Create the recipe title
    const title = document.createElement('p');
    title.classList.add('title');
    title.innerText = data.name;

    // Create the time for recipe
    const time = document.createElement('div');
    if (data.totalTime) {
      const timeIcon = document.createElement('img');
      timeIcon.setAttribute('alt', 'cook time');
      timeIcon.setAttribute('src', '/assets/cooktime.png');
      const timeText = document.createElement('p');
      timeText.innerText = formatTime(data.totalTime);
      time.append(timeIcon, timeText);
    }
    time.classList.add('time-wrapper');

    // Create the tags for recipe
    const tag = document.createElement('tag');
    tag.classList.add('tag-wrapper');

    // Add all of the above elements to the wrapper
    wrapper.append(imgWrapper, title, time, tag);

    // Append the wrapper and the styles to the Shadow DOM
    this.shadowRoot.append(styles, wrapper);
  }

  /**
   * Return recipe showing in json string
   * @return {String} recipe showing in json string
   */
  get data() {
    return this.json;
  }
}

customElements.define('recipe-card', RecipeCard);

/**
 * Makes the time strings readable, for the most part.
 * @param {String} time a string representing the total time for a  recipe
 * @return {String} formatted time string
 */
function formatTime(time) {
  let newText = '';
  if (time) {
    newText = time.replace(/PT/i, '');
    newText = newText.replace(/0H/i, '');
    newText = newText.replace(/H/i, ' Hours ');
    newText = newText.replace(/M/i, ' Minutes');
  }
  return newText;
}
