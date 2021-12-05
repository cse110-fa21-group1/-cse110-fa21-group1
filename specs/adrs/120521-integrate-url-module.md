#  Organizing url module into one single class

## Context and Problem Statement
We have some functions all over the place, like isEdit, getURLid, isSearched, getOffset, getQuery, isPinnedRecipes, isDevelopment. They are spread into differet js file. We want a better way to access them all together.

## Decision Drivers
* Easy to use function

## Considered Options
* Organizing url module into one single class

## Decision Outcome
Chosen option 1: It put the function isEdit, getURLid, isSearched, getOffset, getQuery, isPinnedRecipes, isDevelopment into one single url object to export. So that we import the url module, all of those functions are ready to use.