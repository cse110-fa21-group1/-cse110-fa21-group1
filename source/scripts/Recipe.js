/** A recipe holder (template) */
export class Recipe {
  /* {String} Recipe title */
  name;
  /* {String} Thumbnail */
  image;
  /* {String} Recipe created date */
  datePublished;
  /* {String} Recipe description */
  description;
  /* {String} Recipe time */
  totalTime;
  /* {String} Recipe servings */
  recipeYield;
  /* {Array} Recipe ingredients */
  recipeIngredient;
  /* {Array} Recipe instructions */
  recipeInstruction;
  /* {String} Recipe video url */
  video;
  /* {String} Recipe ID */
  id;
  /* {Array} Recipe tags */
  tags;

  /**
   * Creates an instance of a Recipe.
   *
   * @author: Darwin
   */
  constructor() {}
}

export const recipeDemo = {};
recipeDemo.name = 'The Demo Recipe';
recipeDemo.image = 'https://www.simplyrecipes.com/thmb/OCi18J2V8OeKDFV3FxoeKvgq74E=/1423x1067/smart/filters:no_upscale()/__opt__aboutcom__coeus__resources__content_migration__simply_recipes__uploads__2012__07__grilled-sweet-potatoes-horiz-a-1600-7c8292daa98e4020b447f0dc97a45cb7.jpg';
recipeDemo.datePublished = '2021-11-17';
recipeDemo.description = 'The best recipe ever!';
recipeDemo.totalTime = 'PT30M';
recipeDemo.recipeYield = '100';
recipeDemo.recipeIngredient = ['apple', 'banana', 'potatos'];
recipeDemo.recipeInstruction = [
  'Add apples.',
  'Add bananas.',
  'Add potatos. You are done!',
];
recipeDemo.id = '0000';
