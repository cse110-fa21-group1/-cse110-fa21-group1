/** A recipe holder (template) */
class Recipe {
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
  /* {Int} Recipe ID */
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
