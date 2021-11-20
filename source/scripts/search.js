import {storage} from './storage.js';

window.addEventListener('DOMContentLoaded', init);

const apiKey = 'e4948e03b38847d7b0b4c0e30e37bd17';
// const recipeData = [];
let recipes;

/** Populate recipe cards */
async function init() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  // Attempt to fetch recipes
  try {
    await fetchRecipesHelper(urlParams.get('q'));
  } catch (err) {
    console.log(`Error fetch recipes: ${err}`);
    return; // Return if fetch fails
  }
  populateCards(); // Add <recipe-card> elements to page with fetched data

  // storage.addItem(JSON.stringify(recipeData[0]));
  // const recipeCard = document.querySelector('.recipe-cards--wrapper');
  // const img = recipeCard.querySelector('img');
  // img.setAttribute('src', recipeData[0]['image']);
  // const title = recipeCard.querySelector('p').querySelector('a');
  // title.innerText = recipeData[0]['title'];
  // title.href = recipeData[0]['sourceUrl'];
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
  const queryURL = 'https://api.spoonacular.com/recipes/complexSearch?query=' + query +
        '&addRecipeInformation=true' +
        '&number=3' +
        '&instructionsRequired=true' +
        '&fillIngredients=true' +
        '&apiKey=' + apiKey;
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
            recipes = data['results'];
            resolve();
          }
          // const length = data['results'].length;
          // for (let i = 0; i < length; i++) {
          //   recipeData[recipeData.length] = data['results'][i];
          // }
          // resolve();
        })
        .catch((err) => {
          console.log(`Error loading the ${url} recipe`);
          reject(err);
        });
  });
}
