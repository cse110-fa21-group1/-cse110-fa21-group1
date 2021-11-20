# Meeting 11-17-21
## Meeting info:
Date/Time: 11-17-21\
Type: Workflow\
Facilitator: Dominik\
Note Taker: Matthew

Attendees:
- Dominik Lovric
- Jennifer Pham
- John Yan
- Matthew Chanthirat
- Darwin Chan
- Crisostomo Chan 
- Tianze Guan
- Zimo Peng
- Navya Sharma

# Announcements
From Dominik: 
- Next note taker: Tianze
- Navya said to push and create pull requests
- Prototype due Friday!!!
- Message in slack about video Thursday
  
# What has been done
- Jennifer: worked on Navbar
- Zimo: worked on Crud
- Crisostomo: making shadowroot the thing being manipulated
- John: worked on figma design
- Matt: fixed recipe.HTML and had it pushed to main

# what needs to be done
- backend should populate recipe card page (Darwin says it's already completed)
  
- shift some front end developers to back end to get protoype finished by this Friday (11/19): 
  - John/Jennifer can work on the back end: for Crud
  
- recipe card Page not scrollable, style needs to go back into shadowroot.js file
  
- Possibly have another page to have/show local recipes
  - Can have a way to separate local and searchable recipes, in explore page, in first row(my recipes), rows after come from spoonacular
  - Or Click button on home page, or get there through search bar (and only show spoonacular)

- Server/Client side to store recipes 
  - Recipe cards needs to be done on client side? (mentioned by Cris) May not matter too much as to where it may be (hybrid combo of both)
  
# Backend meeting portion
(Darwin and Cris)
- Recipe card page being populated by fetch recipes, then populate cards which creating instance of shadowroot 
  - Cris will edit the recipe card css file so it can find Darwin's code to allow it to be styled/scrolling
  
- Heart Wrapper in Darwin's code -> Darwin should add documentation to how it works, what it actually creates. (Cris will work on it)

- Need to create a way to track how stuff is liked or not. 

- Add a tag to a class or try to think of way to track a way to if an article is liked, etc. 
  - Darwin suggests just do a catchevent, add them to the cart then localstorage 

- Recipe Page - plan to have a way to redirect to the Recipe.html and be able to populate the HTML elements with appropriate info that is fetched.

- Important thing is being able to navigate to specific recipe page. Be able to differentiate the different pages. 
  
(Zimo)
- Add data from local recipes into own storage

- managing recipe page

- Add recipe cards into their own new page

(Reccomend to Tianze)
- Navigation between pages. (high priority)
Notes:

- Tianze suggests themself to create full documentation of the project itself. Check figma comments

- Database stores recipes/info of user: our local storage can only store strings by keys, save all recipes in form of json. 
  - Using local storage, not cloud. 

(Assign to Mike)
- Whatever Darwin may need help with

# Merges needed
- need Darwin's branch(s) to be merged into main, looked at by Dominik and Navya

