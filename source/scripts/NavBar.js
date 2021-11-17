window.addEventListener('DOMContentLoaded', init);

/** Adds event listeners to the navbar once page is loaded. */
function init() {
  openHamburgerMenu();
  addSearchFunction();
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
    window.location.href = 'http://127.0.0.1:5501/source/Explore.html?q=' + query;
  });
}
