# Add ‘offset=n’ and ‘pinned=true’

## Context and Problem Statement
We want to create a filter in search, so can search only within the pinned recipe. And also a limiting factor for the amount of recipes that can be displayed.

## Decision Drivers
* Add filter for more features
* Easy to view


## Considered Options
* Add an off-set parameter, create an attribute for pinned recipe

## Decision Outcome
Chosen option 1: Because it is easy to implement and it fits the workflow of the project. We add ‘offset=n’ into the params of url when navigating to explore.html and add ‘pinned=true’ if user wants pinned (user) recipes only.