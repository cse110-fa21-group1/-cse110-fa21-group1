import {storage} from './storage.js';
import {isSearched, getQuery, getOffset, navigation} from './url.js';

window.addEventListener('DOMContentLoaded', init);

const apiKey = '8f72885ce9msh6733b33c8debaa0p1a7545jsndbc0510e1813';
const perPageCount = 10;
const previousPageBtn = document.getElementById('previous-page');
const nextPageBtn = document.getElementById('next-page');
let recipes;

/** Populate recipe cards */
async function init() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  if (getOffset() < perPageCount) {
    previousPageBtn.style.display = 'none';
  }

  if (isSearched()) {
    // Attempt to fetch recipes
    try {
      await fetchRecipesHelper(urlParams.get('q'));
    } catch (err) {
      console.log(`Error fetch recipes: ${err}`);
      return; // Return if fetch fails
    }
  } else {
    // Displaying our own recipes
    recipes = storage.getRecipes();
  }
  populateCards(); // Add <recipe-card> elements to page with fetched data
}

/**
 * Populate fetched recipes to the page
 */
function populateCards() {
  if (!recipes) return;
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
 * Populate recipe cards in the page
 * @param {String} query Query string for the search
 */
async function fetchRecipesHelper(query) {
  const queryURL = 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch?query=' + query +
        '&addRecipeInformation=true' +
        '&number=' + perPageCount +
        '&instructionsRequired=true' +
        '&fillIngredients=true' +
        '&offset=' + getOffset() +
        '&rapidapi-key=' + apiKey;
  try {
    await fetchRecipes(queryURL);
  } catch (err) {
    console.log(`Error fetching recipes: ${err}`);
  }
}

/**
 * Fetch recipes from the given url
 * @param {String} url url for fetching recipes
 * @return {Promise} Promise object for identifying job done
 */
async function fetchRecipes(url) {
  return new Promise((resolve, reject) => {
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
          if (data) {
            storage.setSearchedRecipes(JSON.stringify(data['results']));
            recipes = storage.getSearchedRecipes();
            resolve();
          }
        })
        .catch((err) => {
          console.log(`Error loading the ${url} recipe`);
          reject(err);
        });
  });
}

/**
 * Go back to previous page of search results
 */
previousPageBtn.onclick = () => {
  const offset = getOffset();
  navigation.toExplore(getQuery(), true,
        (offset >= perPageCount) ? (offset - perPageCount) : 0 );
};
/**
 * Go back to next page of search results
 */
nextPageBtn.onclick = () => {
  const offset = getOffset();
  console.log(getQuery());
  navigation.toExplore(getQuery(), true, offset + perPageCount );
};
