import {navigation} from './url.js';

window.addEventListener('DOMContentLoaded', init);

/** Adds event listeners to the navbar once page is loaded */
function init() {
  openHamburgerMenu();
  addSearchFunction();
  addNavigation();
}

/** Adds an event listener to the hamburger menu */
function openHamburgerMenu() {
  const hamburgerIcon = document.querySelector('.hamburger-icon');
  hamburgerIcon.addEventListener('click', (event) =>{
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    hamburgerIcon.classList.toggle('hamburger-shown');
    if (hamburgerIcon.classList.contains('hamburger-shown')) {
      hamburgerMenu.style.display = 'block';
    } else {
      hamburgerMenu.style.display = 'none';
    }
  });
}

/** Add event listener for submitting the search form -
 *  navigate to explore page with query string
 */
function addSearchFunction() {
  const searchForm = document.querySelector('.search-container');
  searchForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const query = document.querySelector('#search-bar').value;
    navigation.toExplore(query, true);
  });
}

/**
 * Add event listener to buttons in the nav bar
 */
function addNavigation() {
  const logo = document.getElementById('logo');
  const homeButton = document.getElementById('nav-home');
  const recipeButton = document.getElementById('nav-recipes');
  const viewButton = document.getElementById('nav-view');
  const addButton = document.getElementById('nav-add');
  const editButton = document.getElementById('nav-edit');

  logo.addEventListener('click', (event) => {
    event.preventDefault();
    navigation.toHome();
  });
  homeButton.addEventListener('click', (event) => {
    // Remove default behavior of reloading
    event.preventDefault();
    navigation.toHome();
  });

  recipeButton.addEventListener('click', (event) => {
    event.preventDefault();
    navigation.toExplore('', false);
  });

  viewButton.addEventListener('click', (event) => {
    event.preventDefault();
    navigation.toExplore('', false);
  });

  addButton.addEventListener('click', (event) => {
    event.preventDefault();
    navigation.toManageRecipe(true);
  });

  if (editButton) {
    editButton.addEventListener('click', (event) => {
      event.preventDefault();
      navigation.toManageRecipe(false);
    });
  }

  // Delete button implemented in deleteRecipe.js
}
