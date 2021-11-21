// NavBar.js

window.addEventListener('DOMContentLoaded', init);

/** Adds event listeners to the navbar once page is loaded. */
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
    window.location.href = 'http://127.0.0.1:5501/source/Explore.html?searched=true&q=' + query;
  });
}

/**
 * Add event listener to buttons in the nav bar
 */
function addNavigation() {
  const homeButton = document.getElementById('nav-home');
  const recipeButton = document.getElementById('nav-recipes');
  const viewButton = document.getElementById('nav-view');
  const addButton = document.getElementById('nav-add');
  const editButton = document.getElementById('nav-edit');
  // const deleteButton = document.getElementById('nav-delete');
  const logoutButton = document.getElementById('nav-logout');

  homeButton.addEventListener('click', (event) => {
    // Remove default behavior of reloading
    event.preventDefault();
    window.location.href = window.location.origin + '/source/Home.html';
  });

  recipeButton.addEventListener('click', (event) => {
    event.preventDefault();
    window.location.href = window.location.origin + '/source/Explore.html';
  });

  viewButton.addEventListener('click', (event) => {
    event.preventDefault();
    window.location.href = window.location.origin + '/source/Explore.html';
  });

  addButton.addEventListener('click', (event) => {
    event.preventDefault();
    window.location.href =
      window.location.origin +
      '/source/ManageRecipe.html' +
      window.location.search;
  });

  editButton.addEventListener('click', (event) => {
    event.preventDefault();
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get('id');
    window.location.href =
      window.location.origin + '/source/ManageRecipe.html?id=' + id;
  });

  // Delete button implemented in deleteRecipe.js

  logoutButton.addEventListener('click', (event) => {
    // TODO
  });
}
