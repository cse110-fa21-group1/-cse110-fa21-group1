// recipeCard.js

import( '../styles/explore.css' );
import {storage} from './storage.js';

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
    const urlParams = new URLSearchParams(window.location.search);
    wrapper.onclick = function(e) {
      // console.log('here');
      if (e.target.id != 'heartbutton') {
        window.location.href =
          window.location.origin +
          window.location.pathname.replace('Explore.html', 'Recipe.html') +
          '?' + (urlParams.get('searched') != null ? 'searched=true&' : '') +
          'id=' + data.id;
      }
    };

    // Create the recipe image element
    const imgWrapper = document.createElement('div');
    imgWrapper.classList.add('image-wrapper');
    const img = document.createElement('img');
    img.setAttribute('src', data.image);
    img.setAttribute('alt', data.name);
    const heartWrapper = document.createElement('div');
    heartWrapper.classList.add('placement');
    const heart = document.createElement('div');

    const HeartButton = document.createElement('button');
    HeartButton.setAttribute('id', 'heartbutton');
    storage.init();
    if (storage.isPinned(data.id)) {
      HeartButton.innerText = 'unpin';
    } else {
      HeartButton.innerText = 'pin';
    }
    imgWrapper.append(HeartButton);
    HeartButton.onclick = function() {
      if (!storage.isPinned(data.id)) {
        storage.pinRecipe(data.id);
        // console.log('here');
        // change button innerText
        HeartButton.innerText = 'unpin';
      } else {
        storage.unpinRecipe(data.id);
        // console.log('there');
        // change button innerText
        HeartButton.innerText = 'pin';
      }
    };

    heart.classList.add('heart');
    heartWrapper.append(heart);
    imgWrapper.append(img, heartWrapper);

    // Create the recipe title
    const title = document.createElement('p');
    title.classList.add('title');
    title.innerText = data.name;

    // Create the time for recipe
    const time = document.createElement('div');
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
