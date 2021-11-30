# Modify recipe storage

## Context and Problem Statement
For the recipe app, right now everything in an Json array and it is too inefficient to parse for accessing everytime. 
The time is going to be so long for that if user have a huge amount of recipes,we need a more efficient way to store 
and access the recipes.

## Decision Drivers

* Easy to find
* Less time for parsing

## Considered Options
* Using an ID-Recipe pair for storing every recipe.
* Using tree-like structure.

## Decision Outcome
Chosen option 1: Because it is easier to implement, now we have an ID-Recipe pair for every recipe like a hashmap, 
we no longer need to parse and stringtify everytime we want to access a recipe.
