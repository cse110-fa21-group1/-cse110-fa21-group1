import {storage} from './storage.js';
import {url, navigation} from './url.js';

window.addEventListener('DOMContentLoaded', init);

const apiKey = '8f72885ce9msh6733b33c8debaa0p1a7545jsndbc0510e1813';

/** Initialize the manage page */
function init() {
  const id = url.isEdit();
  if (id != '-1') {
    populateRecipeHelper(id);
  }
}

const returnButton = document.getElementById('return-button');
const leftButton = document.getElementById('back-button');
const rightButton = document.getElementById('next-button');
const ingButton = document.getElementById('ing-button');
const instrButton = document.getElementById('instr-button');
const picButton = document.getElementById('pic-button');
const baseButton = document.getElementById('baseline-button');
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
const hourBox = document.getElementById('hour-box');
const minuteBox = document.getElementById('minute-box');
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

/**
 * Recipe populate helper
 * @param {String} id id of the recipe
 */
function populateRecipeHelper(id) {
  if (url.isSearched() && id != '-1') {
    populateRecipe(storage.getSearchedRecipe(id));
  } else {
    populateRecipe(storage.getRecipe(id));
  }
}

/**
 * Populate using a recipe from online
 * @param {String} url url of the recipe to be fetched from
 */
async function populateBaseline(url) {
  const queryURL = 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/extract?' +
        'rapidapi-key=' + apiKey +
        '&url=' + url;
  await (new Promise((resolve, reject) => {
    fetch(queryURL)
        .then((response) => response.json())
        .then((data) => {
          if (data) {
            const recipe = storage.formatRecipe(data);
            populateRecipe(recipe);
            resolve();
          }
        })
        .catch((err) => {
          console.log(`Error loading the ${url} recipe`);
          reject(err);
        });
  }));
}

/**
 * Populate recipe into our manage page
 * @param {Recipe} recipe the recipe being edited/added
 */
function populateRecipe(recipe) {
  if (Object.keys(recipe).length == 0) return; // TODO: catch error

  // Populate imageUrl
  picURL.value = recipe.image;
  // Populate title
  document.getElementById('name-box').value = recipe.name;
  // Populate description
  document.getElementById('desc-box').value = recipe.description;

  // Populate ingredients
  for (let i=0; i<recipe.recipeIngredient.length; i++) {
    if (i == 0) {
      firstIng.textContent =
        recipe.recipeIngredient[0];
      continue;
    }
    const created = newIng();
    created.textContent = recipe.recipeIngredient[i];
    ingList.appendChild(created);
    created.focus();
  }

  // Populate ingredients
  for (let i=0; i<recipe.recipeInstruction.length; i++) {
    if (i == 0) {
      firstInstr.textContent =
        recipe.recipeInstruction[0];
      continue;
    }
    const created = newInstr();
    created.textContent = recipe.recipeInstruction[i];
    instrList.appendChild(created);
    created.focus();
  }

  // Populate cooktime and servings
  const splitTime =
  recipe.totalTime.split(/^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/);
  document.querySelector('#hour-box').value = splitTime[1];
  document.querySelector('#minute-box').value = splitTime[2];
  document.querySelector('#serving-box').value = recipe.recipeYield;

  // Populate videoUrl
  document.querySelector('#vid-url').value = recipe.video;
}


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

/**
 * Adds 'event listener' for 'Return to Recipes' button
 * to return to previous page
 */
returnButton.onclick = function() {
  window.history.back();
};

/* Adds 'event listeners' for the back and next navigation buttons */
leftButton.onclick = function() {
  moveToPage(currentPage - 1);
};
rightButton.onclick = function() {
  if (currentPage == 3) {
    // save();
    const recp = {};
    recp.name = document.getElementById('name-box').value;
    recp.image = picURL.value;
    let link = youtubeID(vidURL.value);
    if (link.length == 11) link = 'https://youtube.com/embed/' + link;
    recp.video = link;

    let today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    today = mm + '/' + dd + '/' + yyyy;
    recp.datePublished = today;

    recp.description = document.getElementById('desc-box').value;

    hourBox.value = (isNaN(hourBox.value) ||
    hourBox.value.length == 0) ?
    '?' : hourBox.value;
    minuteBox.value = (isNaN(minuteBox.value) ||
    minuteBox.value.length == 0) ?
    '?' : minuteBox.value;
    recp.totalTime = 'PT' + hourBox.value + 'H' + minuteBox.value + 'M';
    recp.recipeYield = document.getElementById('serving-box').value;

    const IngreArray = [];
    const ListIngre = document.querySelectorAll('#ing-box li');
    for (let i = 0; i < ListIngre.length; i++) {
      IngreArray.push(ListIngre[i].textContent);
    }
    recp.recipeIngredient = IngreArray;

    const InstrArray = [];
    const ListInstr = document.querySelectorAll('#instr-box li');
    for (let i = 0; i < ListInstr.length; i++) {
      InstrArray.push(ListInstr[i].textContent);
    }
    recp.recipeInstruction = InstrArray;

    // recp.tag

    let id = url.isEdit();
    // console.log(parseInt(id) > 0)
    // Decide id for navigation
    if (url.isSearched()) {
      id = storage.addRecipe(recp);
    } else if (parseInt(id) > 0) {
      recp.id = id;
      storage.editRecipe(recp);
    } else {
      id = storage.addRecipe(recp);
    }

    navigation.toRecipe(id, true);
  } else {
    moveToPage(currentPage + 1);
  }
};

baseButton.onclick = function() {
  const theURL = document.getElementById('baseline-url').value;
  populateBaseline(theURL);
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

/** Grabs video ID from youtube link and attempts to parse it
 * @param {String} link The link to split with regex
 * @return {String} Either a youtube ID if successful, otherwise link
*/
function youtubeID(link) {
  const parsed = link.split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
  return (parsed[2] !== undefined) ?
  parsed[2].split(/[^0-9a-z_\-]/i)[0] :
  link;
}

/** Adds 'event listeners' for the import video
 *  and picture from URL buttons by setting src.
 *  */
picButton.onclick = function() {
  recipePic.src = picURL.value;
};
vidButton.onclick = function() {
  let link = youtubeID(vidURL.value);
  if (link.length == 11) link = 'https://youtube.com/embed/' + link;
  vidURL.value = link;
  recipeVid.src = link;
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
  created.classList.add('ing-instr');
  created.classList.add('grd-brdr');
  created.addEventListener('paste', (event) => {
    event.preventDefault();
  });
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
  created.classList.add('ing-instr');
  created.classList.add('grd-brdr');
  created.addEventListener('paste', (event) => {
    event.preventDefault();
  });
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
firstIng.addEventListener('paste', (event) => {
  event.preventDefault();
});
firstInstr.addEventListener('paste', (event) => {
  event.preventDefault();
});
