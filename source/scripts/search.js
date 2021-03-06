import {storage} from './storage.js';
import {url, navigation} from './url.js';

window.addEventListener('DOMContentLoaded', init);

const apiKey = '8f72885ce9msh6733b33c8debaa0p1a7545jsndbc0510e1813';
const perPageCount = 12;
const errorText = 'Apologies for error. Please contact developer for support';
// const offsetToggle = document.querySelector('.offset-toggle');
const previousPageBtn = document.getElementById('previous-page');
const nextPageBtn = document.getElementById('next-page');
const moreRandomBtn = document.getElementById('random-toggle');
const spoonResultBtn = document.getElementById('search-spoon');
const userResultBtn = document.getElementById('search-user');
const isPinnedDiv = document.querySelector('.filter-pinned');
const isPinnedCheck = isPinnedDiv.querySelector('input');
const loadingSpinner = document.querySelector('.loader');
const loadingText = document.querySelector('#loading');
const noSpoonRecipeText = document.querySelector('#no-spoon-recipes');
const noUserRecipeText = document.querySelector('#no-user-recipes');

let recipes = [];

/** Populate recipe cards */
async function init() {
  // Updates the search message
  const query = url.getQuery();
  if (query == '') {
    document.querySelector('.search-header > h1')
        .innerText = 'Showing random recipes for you!';
  } else {
    document.querySelector('.search-header > h1')
        .innerText = `Showing recipes for ${query}...`;
  }
  // Do query
  try {
    loadingText.innerText = 'Loading recipes...';
    loadingText.hidden = false;
    loadingSpinner.hidden = false;
    if (url.isSearched() && url.isPinnedRecipes()) {
      spoonResultBtn.checked = true;
      isPinnedCheck.checked = true;
      // Search pinned spoonacular recipes
      await fetchPinnedSearchHelper();
    } else if (url.isSearched()) {
      spoonResultBtn.checked = true;
      if (url.getQuery() == '') {
        // Search random spoonacular recipes
        moreRandomBtn.hidden = false;
        await fetchRandomRecipesHelper();
      } else {
        // Search from query
        if (url.getOffset() >= perPageCount) {
          previousPageBtn.hidden = false;
        }
        nextPageBtn.hidden = false;
        await fetchRecipesHelper(url.getQuery());
      }
    } else {
      userResultBtn.checked = true;
      isPinnedDiv.hidden = false;
      isPinnedCheck.checked = url.isPinnedRecipes();
      // Displaying our own recipes
      recipes = url.isPinnedRecipes() ?
                  storage.getPinnedRecipes(true) :
                  storage.getRecipes();
    }
    loadingText.hidden = true;
    loadingSpinner.hidden = true;
  } catch (err) {
    loadingText.innerText(errorText);
    console.log(`Error fetch recipes: ${err}`);
    return; // Return if fetch fails
  }

  populateCards(); // Add <recipe-card> elements to page with fetched data
}

/**
 * Populate fetched recipes to the page
 */
function populateCards() {
  if (!recipes || recipes.length == 0) {
    displayEmptyResult();
    return;
  }
  // Populate recipes to recipe cards
  recipes.forEach((recipe) => {
    // Populate it with recipe data
    const recipeCard = document.createElement('recipe-card');
    recipeCard.data = recipe;
    // Add card to the page
    document.querySelector('#recipe-cards--wrapper').appendChild(recipeCard);
  });
}

/**
 * Show no result found text
 */
function displayEmptyResult() {
  if (url.isSearched()) noSpoonRecipeText.hidden = false;
  else noUserRecipeText.hidden = false;
}

/** Helper to populate pinned search recipes */
async function fetchPinnedSearchHelper() {
  const queryURL = 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/informationBulk' +
        `?ids=${storage.getPinnedRecipesID(false).join(',')}` +
        `&rapidapi-key=${apiKey}`;
  try {
    await fetchRecipes(queryURL, true);
  } catch (err) {
    console.log(`Error fetching recipes: ${err}`);
  }
}

/** Helper to populate random recipes from Spoonacular */
async function fetchRandomRecipesHelper() {
  const queryURL = 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/random' +
        `?number=${perPageCount}` +
        `&rapidapi-key=${apiKey}`;
  try {
    await fetchRecipes(queryURL, true);
  } catch (err) {
    console.log(`Error fetching recipes: ${err}`);
  }
}
/**
 * Helper to populate searched recipe cards in the page
 * @param {String} query Query string for the search
 */
async function fetchRecipesHelper(query) {
  const queryURL = 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch?query=' + query +
        '&addRecipeInformation=true' +
        `&number=${perPageCount}` +
        '&instructionsRequired=true' +
        '&fillIngredients=true' +
        `&offset=${url.getOffset()}` +
        `&rapidapi-key=${apiKey}`;
  try {
    await fetchRecipes(queryURL);
  } catch (err) {
    console.log(`Error fetching recipes: ${err}`);
  }
}

/**
 * Fetch recipes from the given url
 * @param {String} queryURL url for fetching recipes
 * @param {Boolean} isRandom is fetching random recipes
 * @return {Promise} Promise object for identifying job done
 */
async function fetchRecipes(queryURL, isRandom = false) {
  return new Promise((resolve, reject) => {
    fetch(queryURL)
        .then((response) => response.json())
        .then((data) => {
          if (data) {
            if (isPinnedCheck.checked) {
              console.log(data);
              storage.setSearchedRecipes(JSON.stringify(data));
            } else if (isRandom) {
              storage.setSearchedRecipes(JSON.stringify(data['recipes']));
            } else {
              storage.setSearchedRecipes(JSON.stringify(data['results']));
            }
            recipes = storage.getSearchedRecipes();
            resolve();
          }
        })
        .catch((err) => {
          console.log(`Error loading the ${queryURL} recipe`);
          reject(err);
        });
  });
}

/** Go back to previous page of search results */
previousPageBtn.onclick = () => {
  const offset = url.getOffset();
  navigation.toExplore(url.getQuery(), true,
        (offset >= perPageCount) ? (offset - perPageCount) : 0 );
};
/** Go back to next page of search results */
nextPageBtn.onclick = () => {
  const offset = url.getOffset();
  console.log(url.getQuery());
  navigation.toExplore(url.getQuery(), true, offset + perPageCount );
};
/** Show random recipes */
moreRandomBtn.onclick = () => {
  navigation.toExplore('', true);
};

/** Show Spoonacular recipes */
spoonResultBtn.onchange = () => {
  navigation.toExplore(url.getQuery(), true);
};
/** Show user recipes */
userResultBtn.onchange = () => {
  navigation.toExplore();
};
/** SHow pinned recipes only */
isPinnedCheck.onchange = () => {
  navigation.toExplore('', spoonResultBtn.checked, 0, isPinnedCheck.checked);
};
