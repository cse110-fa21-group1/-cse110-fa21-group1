window.addEventListener('DOMContentLoaded', init);

const apiKey = "e4948e03b38847d7b0b4c0e30e37bd17"
const recipeData = []

/** Populate recipe cards */
async function init() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    await populateRecipeCards(urlParams.get('q'))
    const recipeCard = document.querySelector(".recipe-cards--wrapper")
    recipeCard.querySelector('img').setAttribute('src', recipeData[0]['image'])
    recipeCard.querySelector('p').querySelector('a').innerText = recipeData[0]['title']
    recipeCard.querySelector('p').querySelector('a').href = recipeData[0]['sourceUrl']
}

/**
 * Populate recipe cards in the page
 * @param {String} query Query string for the search
 */
async function populateRecipeCards(query) {
    const queryURL = "https://api.spoonacular.com/recipes/complexSearch?query=" + query
        + "&addRecipeInformation=true"
        + "&number=10"
        + "&apiKey=" + apiKey
    try {
        await fetchRecipes(queryURL)
    } catch (err) {
        console.log(`Error fetching recipes: ${err}`);
    }
}

/**
 * Fetch recipes from the given url
 * @param {String} url url for fetching recipes
 * @returns Promise object for identifying job done
 */
async function fetchRecipes(url) {
    return new Promise((resolve, reject) => {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                for (ind in data['results']) {
                    recipeData[recipeData.length] = data['results'][ind]
                }
                console.log(data['results'])
                resolve()
            })
            .catch(err => {
                console.log(`Error loading the ${url} recipe`);
                reject(err);
            });
    });
}
