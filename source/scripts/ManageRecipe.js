const leftButton = document.getElementById('back-button');
const rightButton = document.getElementById('next-button');
const ingButton = document.getElementById('ing-button');
const instrButton = document.getElementById('instr-button');
const picButton = document.getElementById('pic-button');
const vidButton = document.getElementById('vid-button');
const picURL = document.getElementById('pic-url');
const vidURL = document.getElementById('vid-url');
const recipePic = document.getElementById('recipe-pic');
const recipeVid = document.getElementById('recipe-vid');
const nameText = document.getElementById('current-name');
const ingList = document.getElementById('ing-box');
const instrList = document.getElementById('instr-box');
const firstIng = document.getElementById('first-ing');
const firstInstr = document.getElementById('first-instr');
const box1 = document.getElementById('b1');
const box2 = document.getElementById('b2');
const box3 = document.getElementById('b3');
const box4 = document.getElementById('b4');
const page1 = document.getElementsByClassName('page-one')[0];
const page2 = document.getElementsByClassName('page-two')[0];
const page3 = document.getElementsByClassName('page-three')[0];
const page4 = document.getElementsByClassName('page-four')[0];
let currentPage = 0;
const pages = [page1, page2, page3, page4];
const boxes = [box1, box2, box3, box4];
const titleTexts = [
'Managing a Recipe...',
  'Ingredients!',
  'Instructions!',
  'Finishing Touches'];

/** Helper function for navigating to the 4 different slides of the page
 *  Hides elements from the previous page, shows elements of newPage,
 *  and changes the currentPage counter to the newPage.
 * @param {int} newPage The page number of the page navigating to
 */
function moveToPage(newPage) {
  boxes[currentPage].classList.remove('active-box');
  boxes[newPage].classList.add('active-box');
  pages[currentPage].classList.add('hidden');
  pages[newPage].classList.remove('hidden');
  nameText.textContent = titleTexts[newPage];
  if (currentPage == 0) leftButton.classList.remove('fade');
  if (currentPage == 3) rightButton.textContent = 'Next';
  if (newPage == 0) leftButton.classList.add('fade');
  if (newPage == 3) rightButton.textContent = 'Save';
  currentPage = newPage;
}

/* Adds 'event listeners' for the back and next navigation buttons */
leftButton.onclick = function() {
  moveToPage(currentPage-1);
};
rightButton.onclick = function() {
  if (currentPage == 3) {
    // save();
  }
  else {
    moveToPage(currentPage+1);
  }
};

/* Adds 'event listeners' for the dot navigation */
box1.onclick = function() {
  moveToPage(0);
};
box2.onclick = function() {
  moveToPage(1);
};
box3.onclick = function() {
  moveToPage(2);
};
box4.onclick = function() {
  moveToPage(3);
};

/** Adds 'event listeners' for the import video
 *  and picture from URL buttons by setting src.
 *  */
picButton.onclick = function() {
  recipePic.src = picURL.value;
};
vidButton.onclick = function() {
  recipeVid.src = vidURL.value;
};

/**  Helper function for adding a new ingredient
 *   Creates a new li object and adds event listeners for backspace (to delete)
 *   and enter (to create a new one right below and
 *   moves to it [through focus()]).
 *   @return {li} that li object
 */
function newIng() {
  const created = document.createElement('li');
  created.setAttribute('contenteditable', 'true');
  created.addEventListener('keydown', (event) => {
    if (event.key == 'Backspace') {
      if (created.textContent == '') ingList.removeChild(created);
    }
    if (event.key == 'Enter') {
      event.preventDefault();
      created.parentNode.insertBefore(newIng(), created.nextSibling);
      created.nextSibling.focus();
    }
  });
  return created;
}

/** Adds 'event listener' to the add ingredient button
 *  Specifically creates an ingredient, appends it to the list, and finally
 *  moves to editing the new ingredient.
 */
ingButton.onclick = function() {
  const created = newIng();
  ingList.appendChild(created);
  created.focus();
};

/**  Helper function for adding a new instruction
 *   Creates a new li object and adds event listeners for backspace (to delete)
 *   and enter (to create a new one right below and
 *   moves to it [through focus()]).
 *   @return {li} that li object
 */
function newInstr() {
  const created = document.createElement('li');
  created.setAttribute('contenteditable', 'true');
  created.addEventListener('keydown', (event) => {
    if (event.key == 'Backspace') {
      if (created.textContent == '') instrList.removeChild(created);
    }
    if (event.key == 'Enter') {
      event.preventDefault();
      created.parentNode.insertBefore(newInstr(), created.nextSibling);
      created.nextSibling.focus();
    }
  });
  return created;
}

/** Adds 'event listener' to the add ingredient button
 *  Specifically creates an instruction, appends it to the list, and finally
 *  moves to editing the new instruction.
 */
instrButton.onclick = function() {
  const created = newInstr();
  instrList.appendChild(created);
  created.focus();
};

/** Adds event listeners to the first ingredient and instruction
 *  Unlike the created ingredients and instructions, it cannot be deleted.
 */
firstIng.addEventListener('keydown', (event) => {
  if (event.key == 'Enter') {
    event.preventDefault();
    firstIng.parentNode.insertBefore(newIng(), firstIng.nextSibling);
    firstIng.nextSibling.focus();
  }
});
firstInstr.addEventListener('keydown', (event) => {
  if (event.key == 'Enter') {
    event.preventDefault();
    firstInstr.parentNode.insertBefore(newInstr(), firstInstr.nextSibling);
    firstInstr.nextSibling.focus();
  }
});
