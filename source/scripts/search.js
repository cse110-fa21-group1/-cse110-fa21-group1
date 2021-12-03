import {storage} from './storage.js';
import {isSearched} from './url.js';

window.addEventListener('DOMContentLoaded', init);

const apiKey = '8f72885ce9msh6733b33c8debaa0p1a7545jsndbc0510e1813';
// const recipeData = [];
let recipes;

/** Populate recipe cards */
async function init() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

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
        '&number=3' +
        '&instructionsRequired=true' +
        '&fillIngredients=true' +
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
