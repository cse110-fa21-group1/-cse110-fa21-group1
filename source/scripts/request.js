// request.js



function test() {
    console.log('HI')
}

/**
 * 
 * @param {String} query The query string of the search
 */
async function search() {
    query = document.getElementById('search-bar').value
    queryURL = "https://api.spoonacular.com/recipes/complexSearch?query=" + query
        + "&addRecipeInformation=true"
        + "&number=3"
        + "&apiKey=" + apiKey
    try {
        await fetchRecipes(queryURL)
    } catch (err) {
        console.log(`Error fetching recipes: ${err}`);
        return;
    }
    window.location.href = "http://127.0.0.1:5501/source/Explore.html?q=" + query
    // return response
}

const recipeData = {}

async function fetchRecipes(url) {
    return new Promise((resolve, reject) => {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                recipeData = data
                resolve()
            })
            .catch(err => {
                console.log(`Error loading the ${query} recipe`);
                reject(err);
            });
    });
}

// Pass query (#search-bar.value) to our explore page for searching
// const form = this.shadow.querySelector('form')
// const searchBar = this.shadow.querySelector('#search-bar')
// form.addEventListener('submit', function (e) {
//   e.preventDefault()
//   spoonacularSearch(searchBar.value)
//   window.location.href = "http://127.0.0.1:5501/source/Explore.html?q=" + searchBar.value
// })