
window.addEventListener('DOMContentLoaded', init);

function init() {
  openHamburgerMenu();
}

// Opens and closes the hamburger menu.
function openHamburgerMenu(){
  const hamburgerIcon = document.querySelector(".hamburger-icon");
  hamburgerIcon.addEventListener('click', (event) =>{
    const hamburgerMenu = document.querySelector(".hamburger-menu");
    hamburgerIcon.classList.toggle("hamburger-shown");
    if (hamburgerIcon.classList.contains("hamburger-shown")) {
      hamburgerMenu.style.display = "block";
    } else {
      hamburgerMenu.style.display = "none";
    }
    console.log('clicked');
  });
}

