window.addEventListener('DOMContentLoaded', init);

/** Adds event listeners to the navbar once page is loaded. */
function init() {
  openHamburgerMenu();
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

